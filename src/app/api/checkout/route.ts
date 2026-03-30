import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import {
  DEFAULT_REGION,
  type Region,
  getProductById,
  getRegionalInfo,
  isProductAvailableForRegion,
  isProductFulfillmentReady,
  isSupportedProductSize,
  normalizeProductSize,
} from '@/data/products.data';

type CheckoutItemPayload = {
  product?: {
    id?: string;
  };
  size?: string;
  quantity?: number;
};

type CheckoutRequestBody = {
  items?: CheckoutItemPayload[];
  region?: Region;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY_PER_LINE = 10;
const ALLOWED_SHIPPING_COUNTRIES = ['FR', 'BE', 'CH', 'US', 'CA', 'GB', 'DE', 'ES', 'IT'] as const;

function isValidRegion(value: unknown): value is Region {
  return value === 'EU' || value === 'US';
}

function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL ou NEXT_PUBLIC_URL manquante.');
  }

  return baseUrl.replace(/\/+$/, '');
}

function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY manquante.');
  }

  return new Stripe(secretKey);
}

function getCheckoutErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Impossible de créer la session de paiement.';
}

function validateQuantity(quantity: unknown, productId: string): number {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
    throw new Error(`Quantité invalide pour le produit ${productId}.`);
  }

  if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY_PER_LINE) {
    throw new Error(
      `La quantité du produit ${productId} doit être comprise entre ${MIN_QUANTITY} et ${MAX_QUANTITY_PER_LINE}.`,
    );
  }

  return quantity;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const items = body.items ?? [];
    const region: Region = isValidRegion(body.region) ? body.region : DEFAULT_REGION;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Le panier est vide.' }, { status: 400 });
    }

    const baseUrl = getBaseUrl();
    const stripe = getStripeClient();

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const productId = item.product?.id;

      if (!productId) {
        throw new Error('Un produit du panier est invalide : identifiant manquant.');
      }

      const product = getProductById(productId);

      if (!product) {
        throw new Error(`Produit ${productId} non trouvé dans le catalogue.`);
      }

      if (!product.isActive) {
        throw new Error(`Le produit ${productId} est actuellement indisponible.`);
      }

      if (!isProductAvailableForRegion(product, region)) {
        throw new Error(`Le produit ${productId} n’est pas disponible pour la région ${region}.`);
      }

      if (!isProductFulfillmentReady(product, region)) {
        throw new Error(
          `Le produit ${productId} n’est pas encore prêt pour le fulfillment en région ${region}.`,
        );
      }

      const size = item.size?.trim();

      if (!size) {
        throw new Error(`Taille manquante pour le produit ${productId}.`);
      }

      if (!isSupportedProductSize(product, size)) {
        throw new Error(`Taille invalide pour le produit ${productId} : ${size}.`);
      }

      const normalizedSize = normalizeProductSize(size);

      if (!normalizedSize) {
        throw new Error(`Taille invalide pour le produit ${productId} : ${size}.`);
      }

      const quantity = validateQuantity(item.quantity, productId);
      const regionalInfo = getRegionalInfo(product, region);

      return {
        price_data: {
          currency: regionalInfo.currency.toLowerCase(),
          product_data: {
            name: product.name,
            images: [`${baseUrl}${product.image}`],
            metadata: {
              productId: product.id,
              sku: product.sku,
              size: normalizedSize,
              provider: regionalInfo.provider,
              providerId: regionalInfo.providerId,
              collection: product.collection,
              category: product.category,
              region,
            },
          },
          unit_amount: Math.round(regionalInfo.price * 100),
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: [...ALLOWED_SHIPPING_COUNTRIES],
      },
      success_url: `${baseUrl}/wear/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/wear/checkout/cancel`,
      metadata: {
        order_region: region,
        checkout_source: 'zone21-wear',
      },
    });

    if (!session.url) {
      throw new Error("Stripe n'a pas renvoyé d'URL de redirection.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur lors de la création du checkout :', error);

    const message = getCheckoutErrorMessage(error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}