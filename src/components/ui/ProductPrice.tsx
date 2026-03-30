'use client';

import { useEffect } from 'react';

import {
  DEFAULT_REGION,
  type Product,
  type Region,
  getRegionalInfo,
  isProductAvailableForRegion,
  isProductFulfillmentReady,
} from '@/data/products.data';
import useIsClient from '@/hooks/useIsClient';
import { useCartStore } from '@/store/cartStore';

function getRegionLabel(region: Region): string {
  return region === 'EU' ? 'Europe' : 'International';
}

export default function ProductPrice({ product }: { product: Product }) {
  const { region, hydrateRegionFromCookie } = useCartStore();
  const isClient = useIsClient();

  useEffect(() => {
    hydrateRegionFromCookie();
  }, [hydrateRegionFromCookie]);

  const currentRegion: Region = isClient ? region : DEFAULT_REGION;
  const info = getRegionalInfo(product, currentRegion);

  const isRegionAvailable = isProductAvailableForRegion(product, currentRegion);
  const isFulfillmentReady = isProductFulfillmentReady(product, currentRegion);
  const isPurchasable = product.isActive && isRegionAvailable && isFulfillmentReady;

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: info.currency,
  }).format(info.price);

  const helperText = !product.isActive
    ? 'Pièce actuellement indisponible'
    : !isRegionAvailable
      ? `Non disponible pour la région ${currentRegion}`
      : !isFulfillmentReady
        ? 'Tarification visible, commande bientôt activée'
        : `Tarification ${getRegionLabel(currentRegion)} · ${info.currency}`;

  return (
    <div className="flex flex-col gap-2">
      <p
        className={`font-sans text-2xl font-light transition-opacity duration-300 ${
          isPurchasable ? 'text-[#C5B39B]' : 'text-[#EAE8E3]/55'
        } ${isClient ? 'opacity-100' : 'opacity-0'}`}
      >
        {formattedPrice}
      </p>

      {isClient ? (
        <span
          className={`font-sans text-[0.6rem] uppercase tracking-[0.1em] ${
            isPurchasable ? 'text-[#EAE8E3]/30' : 'text-[#EAE8E3]/45'
          }`}
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
}