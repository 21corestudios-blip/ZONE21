import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { type Region, wearProducts } from '@/data/products.data';

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

const DEFAULT_REGION: Region = 'EU';

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
      const quantity = item.quantity;
      const size = item.size?.trim();

      if (!productId) {
        throw new Error('Un produit du panier est invalide : identifiant manquant.');
      }

      if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
        throw new Error(`Quantité invalide pour le produit ${productId}.`);
      }

      if (!size) {
        throw new Error(`Taille manquante pour le produit ${productId}.`);
      }

      const product = wearProducts.find((entry) => entry.id === productId);

      if (!product) {
        throw new Error(`Produit ${productId} non trouvé dans la base.`);
      }

      const regionalInfo = product.regions[region] ?? product.regions[DEFAULT_REGION];

      if (!regionalInfo) {
        throw new Error(`Aucune information tarifaire disponible pour ${productId}.`);
      }

      return {
        price_data: {
          currency: regionalInfo.currency.toLowerCase(),
          product_data: {
            name: product.name,
            images: [`${baseUrl}${product.image}`],
            metadata: {
              size,
              providerId: regionalInfo.providerId,
              provider: regionalInfo.provider,
              productId: product.id,
              collection: product.collection,
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
        allowed_countries: ['FR', 'BE', 'CH', 'US', 'CA', 'GB', 'DE', 'ES', 'IT'],
      },
      success_url: `${baseUrl}/wear/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/wear/checkout/cancel`,
      metadata: {
        order_region: region,
      },
    });

    if (!session.url) {
      throw new Error("Stripe n'a pas renvoyé d'URL de redirection.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erreur lors de la création du checkout :', error);

    const message =
      error instanceof Error ? error.message : 'Impossible de créer la session de paiement.';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}