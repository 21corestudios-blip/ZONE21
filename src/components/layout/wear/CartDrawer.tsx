'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Icon from '@/components/ui/Icon';
import { Region } from '@/data/products.data';
import { useCartStore } from '@/store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_REGION: Region = 'EU';

function getCurrencyForRegion(region: Region): string {
  return region === 'EU' ? 'EUR' : 'USD';
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    removeItem,
    region,
    getTotalPrice,
    getTotalItems,
    hydrateRegionFromCookie,
  } = useCartStore();

  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    hydrateRegionFromCookie();
    setMounted(true);
  }, [hydrateRegionFromCookie]);

  const currentRegion: Region = mounted ? region : DEFAULT_REGION;

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          region: currentRegion,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert(`Erreur : ${data.error || 'Impossible de créer la session de paiement.'}`);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur Checkout:', error);
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="relative flex h-full w-full max-w-md flex-col border-l border-[#EAE8E3]/10 bg-[#121110] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
      >
        <div className="flex items-center justify-between border-b border-[#EAE8E3]/10 p-6">
          <h2 className="font-serif text-xl text-[#EAE8E3]">Votre Sélection ({getTotalItems()})</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panier"
            className="text-[#EAE8E3]/50 transition-colors hover:text-[#C5B39B]"
          >
            <Icon size={24}>
              <path d="M18 6L6 18M6 6l12 12" />
            </Icon>
          </button>
        </div>

        <div className="flex-grow space-y-6 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center opacity-30">
              <Icon size={48} className="mb-4">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </Icon>
              <p className="font-sans text-xs uppercase tracking-widest">Le panier est vide</p>
            </div>
          ) : (
            items.map((item) => {
              const regionalInfo =
                item.product.regions[currentRegion] ?? item.product.regions[DEFAULT_REGION];

              const formattedPrice = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: regionalInfo.currency,
              }).format(regionalInfo.price);

              return (
                <div key={`${item.product.id}-${item.size}`} className="group flex gap-4">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-[#1a1918]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-grow flex-col justify-between py-1">
                    <div>
                      <h4 className="mb-1 text-[0.7rem] uppercase tracking-wider text-[#EAE8E3]">
                        {item.product.name}
                      </h4>
                      <p className="text-[0.6rem] uppercase tracking-widest text-[#EAE8E3]/40">
                        Taille : {item.size} | Qté : {item.quantity}
                      </p>
                    </div>

                    <p className="font-serif text-sm text-[#C5B39B]">{formattedPrice}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id, item.size)}
                    aria-label={`Retirer ${item.product.name} du panier`}
                    className="self-start p-1 text-[#EAE8E3]/20 transition-colors hover:text-red-900"
                  >
                    <Icon size={16}>
                      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </Icon>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#EAE8E3]/10 bg-[#1a1918] p-6">
            <div className="mb-6 flex items-end justify-between">
              <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#EAE8E3]/50">
                Total
              </span>

              <span className="font-serif text-2xl text-[#C5B39B]">
                {mounted
                  ? new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: getCurrencyForRegion(currentRegion),
                    }).format(getTotalPrice())
                  : '—'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-[#C5B39B] py-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#121110] transition-all duration-500 hover:bg-[#EAE8E3] disabled:opacity-50"
            >
              {isLoading ? 'Connexion Stripe...' : 'Passer à la caisse'}
            </button>

            <div className="mt-4 flex flex-col items-center gap-2 opacity-30">
              <div className="flex gap-3 text-[0.5rem] font-bold tracking-widest">
                <span>VISA</span>
                <span>MASTERCARD</span>
                <span>PAYPAL</span>
                <span>AMEX</span>
              </div>
              <p className="text-[0.5rem] uppercase tracking-tighter">Paiement 100% sécurisé</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}