import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const gelatoApiKey = process.env.GELATO_API_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY manquante.');
}

const stripe = new Stripe(stripeSecretKey);

type StripeExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product;
  };
};

type CheckoutSessionWithShipping = Stripe.Checkout.Session & {
  shipping_details?: {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      postal_code?: string | null;
      country?: string | null;
    } | null;
  } | null;
};

type GelatoOrderItem = {
  itemReferenceId: string;
  variantId: string;
  quantity: number;
};

type GelatoOrderPayload = {
  orderReferenceId: string;
  customerReferenceId: string;
  currencyCode: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postCode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: GelatoOrderItem[];
};

function isExpandedLineItem(item: Stripe.LineItem): item is StripeExpandedLineItem {
  const price = item.price;

  if (!price || typeof price === 'string') {
    return false;
  }

  const product = price.product;

  if (!product || typeof product === 'string') {
    return false;
  }

  return true;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Erreur inconnue';
}

function isSupportedGelatoCountry(country: string): boolean {
  return ['FR', 'BE', 'CH', 'US', 'CA', 'GB', 'DE', 'ES', 'IT'].includes(country);
}

function splitCustomerName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return {
      firstName: 'Client',
      lastName: 'Zone21',
    };
  }

  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: 'Client',
    };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function validateShippingSession(session: CheckoutSessionWithShipping) {
  const shippingName = session.shipping_details?.name?.trim();
  const address = session.shipping_details?.address;
  const email = session.customer_details?.email?.trim();
  const phone = session.customer_details?.phone?.trim() || '0000000000';

  if (!shippingName) {
    throw new Error(`Nom de livraison manquant pour la session ${session.id}.`);
  }

  if (!address) {
    throw new Error(`Adresse de livraison manquante pour la session ${session.id}.`);
  }

  if (!address.line1?.trim()) {
    throw new Error(`Adresse ligne 1 manquante pour la session ${session.id}.`);
  }

  if (!address.city?.trim()) {
    throw new Error(`Ville de livraison manquante pour la session ${session.id}.`);
  }

  if (!address.postal_code?.trim()) {
    throw new Error(`Code postal manquant pour la session ${session.id}.`);
  }

  if (!address.country?.trim()) {
    throw new Error(`Pays de livraison manquant pour la session ${session.id}.`);
  }

  if (!isSupportedGelatoCountry(address.country.trim().toUpperCase())) {
    throw new Error(
      `Pays de livraison non supporté pour Gelato sur la session ${session.id} : ${address.country}.`,
    );
  }

  if (!email) {
    throw new Error(`Email client manquant pour la session ${session.id}.`);
  }

  return {
    shippingName,
    email,
    phone,
    address: {
      line1: address.line1.trim(),
      line2: address.line2?.trim() || '',
      city: address.city.trim(),
      postalCode: address.postal_code.trim(),
      country: address.country.trim().toUpperCase(),
    },
  };
}

function buildGelatoItems(items: Stripe.LineItem[], sessionId: string): GelatoOrderItem[] {
  const gelatoItems = items
    .filter(isExpandedLineItem)
    .map((item) => {
      const productMetadata = item.price.product.metadata;
      const provider = productMetadata.provider?.trim().toLowerCase();
      const providerId = productMetadata.providerId?.trim();
      const productId = productMetadata.productId?.trim();
      const size = productMetadata.size?.trim();
      const quantity = item.quantity ?? 1;

      if (provider !== 'gelato') {
        return null;
      }

      if (!providerId) {
        throw new Error(
          `providerId manquant dans les metadata Stripe pour la ligne ${item.id} de la session ${sessionId}.`,
        );
      }

      if (!productId) {
        throw new Error(
          `productId manquant dans les metadata Stripe pour la ligne ${item.id} de la session ${sessionId}.`,
        );
      }

      if (!size) {
        throw new Error(
          `size manquante dans les metadata Stripe pour la ligne ${item.id} de la session ${sessionId}.`,
        );
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(
          `Quantité invalide pour la ligne ${item.id} de la session ${sessionId}.`,
        );
      }

      return {
        itemReferenceId: item.id,
        variantId: providerId,
        quantity,
      };
    })
    .filter((item): item is GelatoOrderItem => item !== null);

  return gelatoItems;
}

async function sendGelatoOrder(order: GelatoOrderPayload) {
  const response = await fetch('https://api.gelato.com/v2/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': gelatoApiKey as string,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const rawBody = await response.text();

    throw new Error(
      `Gelato a rejeté la commande ${order.orderReferenceId} avec le statut ${response.status} : ${rawBody}`,
    );
  }

  return (await response.json()) as { orderId?: string };
}

export async function POST(req: Request) {
  if (!stripeWebhookSecret) {
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET manquante.' },
      { status: 500 },
    );
  }

  if (!gelatoApiKey) {
    return NextResponse.json(
      { error: 'GELATO_API_KEY manquante.' },
      { status: 500 },
    );
  }

  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature Stripe manquante.' },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (error: unknown) {
    console.error(`❌ Erreur de signature webhook : ${getErrorMessage(error)}`);

    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as CheckoutSessionWithShipping;

  try {
    const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    const gelatoItems = buildGelatoItems(lineItemsResponse.data, session.id);

    if (gelatoItems.length === 0) {
      console.log(
        `ℹ️ Session ${session.id} sans article Gelato à transmettre. Aucun envoi fournisseur déclenché.`,
      );

      return NextResponse.json({ received: true });
    }

    const validatedShipping = validateShippingSession(session);
    const { firstName, lastName } = splitCustomerName(validatedShipping.shippingName);

    const gelatoOrder: GelatoOrderPayload = {
      orderReferenceId: session.id,
      customerReferenceId: validatedShipping.email,
      currencyCode: session.currency?.toUpperCase() || 'EUR',
      shippingAddress: {
        firstName,
        lastName,
        addressLine1: validatedShipping.address.line1,
        addressLine2: validatedShipping.address.line2,
        city: validatedShipping.address.city,
        postCode: validatedShipping.address.postalCode,
        country: validatedShipping.address.country,
        email: validatedShipping.email,
        phone: validatedShipping.phone,
      },
      items: gelatoItems,
    };

    const gelatoResult = await sendGelatoOrder(gelatoOrder);

    console.log(
      '✅ Commande transmise à Gelato :',
      JSON.stringify({
        sessionId: session.id,
        gelatoOrderId: gelatoResult.orderId ?? null,
        itemCount: gelatoItems.length,
      }),
    );
  } catch (error: unknown) {
    console.error(
      '❌ Erreur lors du traitement de la commande Stripe -> Gelato :',
      getErrorMessage(error),
    );

    return NextResponse.json(
      {
        error: 'Traitement de commande impossible.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}