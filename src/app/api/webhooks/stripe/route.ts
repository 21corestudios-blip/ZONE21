import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: null as any,
});

// C'est ici que la magie opère après le paiement
export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    // On vérifie que c'est bien Stripe qui nous parle (sécurité)
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Si le paiement est réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // 1. Récupérer les infos du client et de la commande
    const customerDetails = session.customer_details;
    const items = await stripe.checkout.sessions.listLineItems(session.id);

    console.log("💰 PAIEMENT REÇU pour :", customerDetails?.email);
    console.log("📦 ARTICLES À PRODUIRE :", items.data);

    // TODO : Ici, nous ajouterons le code pour appeler l'API de Gelato
    // avec l'adresse de livraison récupérée dans 'session.shipping_details'
  }

  return NextResponse.json({ received: true });
}