import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { wearProducts, Region } from '@/data/products.data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore : On laisse Stripe gérer la version compatible avec votre compte
  apiVersion: null, 
});

export async function POST(request: Request) {
  
  try {
    const { items, region }: { items: any[], region: Region } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    // 1. PROTECTION : On recalcule les prix côté serveur 
    // On ne fait jamais confiance aux prix envoyés par le navigateur (trop facile à hacker)
    const line_items = items.map((item) => {
      const product = wearProducts.find((p) => p.id === item.product.id);
      
      if (!product) {
        throw new Error(`Produit ${item.product.id} non trouvé dans la base.`);
      }

      const regInfo = product.regions[region];

      return {
        price_data: {
          currency: regInfo.currency.toLowerCase(),
          product_data: {
            name: product.name,
            images: [process.env.NEXT_PUBLIC_URL + product.image],
            metadata: {
              size: item.size,
              providerId: regInfo.providerId, // Utile pour Gelato plus tard
            },
          },
          // Stripe attend des centimes (45.00€ -> 4500)
          unit_amount: Math.round(regInfo.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // 2. CRÉATION DE LA SESSION STRIPE
    const session = await stripe.checkout.sessions.create({
      // Ici on active CB et PayPal (assurez-vous d'avoir lié PayPal dans votre bord Stripe)
      payment_method_types: ['card', 'paypal'],
      line_items,
      mode: 'payment',
      
      // On demande l'adresse de livraison (obligatoire pour envoyer à Gelato)
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'US', 'CA', 'GB', 'DE', 'ES', 'IT'], 
      },

      // URLs de redirection après le paiement
      success_url: `${process.env.NEXT_PUBLIC_URL}/wear/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/wear/checkout/cancel`,
      
      // On garde la région en mémoire pour le suivi
      metadata: {
        order_region: region,
      },
    });

    // On renvoie l'URL de la page Stripe sécurisée au frontend
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Erreur lors de la création du checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}