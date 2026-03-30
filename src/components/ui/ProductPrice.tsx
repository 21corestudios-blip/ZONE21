'use client';

import { useEffect, useState } from 'react';

import { Product, Region } from '@/data/products.data';
import { useCartStore } from '@/store/cartStore';

const DEFAULT_REGION: Region = 'EU';

function getShippingLabel(region: Region): string {
  return region === 'EU' ? 'Europe' : 'International';
}

export default function ProductPrice({ product }: { product: Product }) {
  const { region, hydrateRegionFromCookie } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    hydrateRegionFromCookie();
    setMounted(true);
  }, [hydrateRegionFromCookie]);

  const currentRegion: Region = mounted ? region : DEFAULT_REGION;
  const info = product.regions[currentRegion] ?? product.regions[DEFAULT_REGION];

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: info.currency,
  }).format(info.price);

  return (
    <div className="flex flex-col gap-2">
      <p
        className={`font-sans text-2xl font-light text-[#C5B39B] transition-opacity duration-300 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {formattedPrice}
      </p>

      {mounted && (
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.1em] text-[#EAE8E3]/30">
          Taxes incluses — Expédition {getShippingLabel(currentRegion)}
        </span>
      )}
    </div>
  );
}