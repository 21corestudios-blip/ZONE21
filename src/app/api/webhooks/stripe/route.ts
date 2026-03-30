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

function isExpandedLineItem(item: Stripe.LineItem): item is StripeExpandedLineItem {
  return (
    !!item.price &&
    typeof item.price !== 'string' &&
    !!item.price.product &&
    typeof item.price.product !== 'string'
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Erreur inconnue';
}

export async function POST(req: Request) {
  if (!stripeWebhookSecret) {
    return NextResponse.json({ error: 'STRIPE_WEBHOOK_SECRET manquante.' }, { status: 500 });
  }

  if (!gelatoApiKey) {
    return NextResponse.json({ error: 'GELATO_API_KEY manquante.' }, { status: 500 });
  }

  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature');

  if (!signature) {
    return NextResponse.json({ error: 'Signature Stripe manquante.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (error: unknown) {
    console.error(`❌ Erreur de signature Webhook : ${getErrorMessage(error)}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as CheckoutSessionWithShipping;

    try {
      const lineItemsResponse = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const gelatoItems = lineItemsResponse.data
        .filter(isExpandedLineItem)
        .map((item) => {
          const productMetadata = item.price.product.metadata;
          const providerId = productMetadata.providerId;

          if (!providerId) {
            throw new Error(
              `providerId manquant dans les metadata Stripe pour la ligne ${item.id}.`,
            );
          }

          return {
            itemReferenceId: item.id,
            variantId: providerId,
            quantity: item.quantity ?? 1,
          };
        });

      const addr = session.shipping_details?.address;
      const customerName = session.shipping_details?.name?.trim() || 'Client Zone 21';
      const customerEmail = session.customer_details?.email || 'no-email';
      const customerPhone = session.customer_details?.phone || '0000000000';

      const nameParts = customerName.split(/\s+/);
      const firstName = nameParts[0] || 'Client';
      const lastName = nameParts.slice(1).join(' ') || ' ';

      const gelatoOrder = {
        orderReferenceId: session.id,
        customerReferenceId: customerEmail,
        currencyCode: session.currency?.toUpperCase() || 'EUR',
        shippingAddress: {
          firstName,
          lastName,
          addressLine1: addr?.line1 || '',
          addressLine2: addr?.line2 || '',
          city: addr?.city || '',
          postCode: addr?.postal_code || '',
          country: addr?.country || '',
          email: customerEmail,
          phone: customerPhone,
        },
        items: gelatoItems,
      };

      const gelatoResponse = await fetch('https://api.gelato.com/v2/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': gelatoApiKey,
        },
        body: JSON.stringify(gelatoOrder),
      });

      if (!gelatoResponse.ok) {
        const errorDetails = await gelatoResponse.json();
        console.error('❌ ERREUR GELATO :', JSON.stringify(errorDetails, null, 2));
      } else {
        const gelatoResult = (await gelatoResponse.json()) as { orderId?: string };
        console.log('🚀 COMMANDE CRÉÉE CHEZ GELATO ! ID :', gelatoResult.orderId);
      }
    } catch (error: unknown) {
      console.error('❌ ERREUR TRAITEMENT COMMANDE :', getErrorMessage(error));
    }
  }

  return NextResponse.json({ received: true });
}