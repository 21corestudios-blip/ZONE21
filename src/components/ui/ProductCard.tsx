'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { region, hydrateRegionFromCookie } = useCartStore();
  const isClient = useIsClient();

  useEffect(() => {
    hydrateRegionFromCookie();
  }, [hydrateRegionFromCookie]);

  const currentRegion: Region = isClient ? region : DEFAULT_REGION;
  const regionalInfo = getRegionalInfo(product, currentRegion);

  const isRegionAvailable = isProductAvailableForRegion(product, currentRegion);
  const isFulfillmentReady = isProductFulfillmentReady(product, currentRegion);
  const isPurchasable = isRegionAvailable && isFulfillmentReady;

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: regionalInfo.currency,
  }).format(regionalInfo.price);

  return (
    <Link
      href={`/wear/${product.collection}/${product.id}`}
      aria-label={`Découvrir ${product.name}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1918]">
        {product.isNew ? (
          <div className="absolute left-3 top-3 z-10 bg-[#C5B39B] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#121110]">
            Nouveau
          </div>
        ) : null}

        {!isPurchasable ? (
          <div className="absolute right-3 top-3 z-10 border border-white/15 bg-black/65 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
            Bientôt disponible
          </div>
        ) : null}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 ${
            !isPurchasable ? 'opacity-80' : ''
          }`}
        />

        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isPurchasable ? 'bg-black/0 group-hover:bg-black/20' : 'bg-black/25 group-hover:bg-black/30'
          }`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm uppercase tracking-[0.1em] text-[#EAE8E3] md:text-base">
          {product.name}
        </h3>

        <p
          className={`font-serif text-lg transition-opacity duration-300 ${
            isPurchasable ? 'text-[#C5B39B]' : 'text-[#EAE8E3]/55'
          }`}
        >
          {!isClient ? '...' : isPurchasable ? formattedPrice : 'Disponible bientôt'}
        </p>

        {!isPurchasable ? (
          <p className="pt-1 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
            Commande temporairement indisponible pour votre région
          </p>
        ) : null}
      </div>
    </Link>
  );
}