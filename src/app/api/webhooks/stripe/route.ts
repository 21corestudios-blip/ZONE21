import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: null as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`❌ Erreur de signature Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    // On utilise "as any" ici pour débloquer l'accès aux propriétés de livraison
    // que TypeScript ne voit pas toujours par défaut sur l'interface Session
    const session = event.data.object as any;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const gelatoItems = lineItems.data.map((item: any) => {
        const productMetadata = item.price.product.metadata;
        
        return {
          itemReferenceId: item.id,
          variantId: productMetadata.providerId,
          quantity: item.quantity,
        };
      });

      // Maintenant "shipping_details" ne causera plus d'erreur
      const addr = session.shipping_details?.address;
      const customerName = session.shipping_details?.name || "Client Zone 21";
      
      const nameParts = customerName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || ' ';

      const gelatoOrder = {
        orderReferenceId: session.id,
        customerReferenceId: session.customer_details?.email || "no-email",
        currencyCode: session.currency?.toUpperCase() || "EUR",
        shippingAddress: {
          firstName: firstName,
          lastName: lastName,
          addressLine1: addr?.line1 || '',
          addressLine2: addr?.line2 || '',
          city: addr?.city || '',
          postCode: addr?.postal_code || '',
          country: addr?.country || '',
          email: session.customer_details?.email || '',
          phone: session.customer_details?.phone || '0000000000'
        },
        items: gelatoItems
      };

      const gelatoResponse = await fetch('https://api.gelato.com/v2/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.GELATO_API_KEY!
        },
        body: JSON.stringify(gelatoOrder)
      });

      if (!gelatoResponse.ok) {
        const errorDetails = await gelatoResponse.json();
        console.error("❌ ERREUR GELATO :", JSON.stringify(errorDetails, null, 2));
      } else {
        const gelatoResult = await gelatoResponse.json();
        console.log("🚀 COMMANDE CRÉÉE CHEZ GELATO ! ID :", gelatoResult.orderId);
      }

    } catch (error) {
      console.error("❌ ERREUR TRAITEMENT COMMANDE :", error);
    }
  }

  return NextResponse.json({ received: true });
}