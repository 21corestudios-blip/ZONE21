'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product, Region } from '@/data/products.data';
import useIsClient from '@/hooks/useIsClient';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

const DEFAULT_REGION: Region = 'EU';

export default function ProductCard({ product }: ProductCardProps) {
  const { region, hydrateRegionFromCookie } = useCartStore();
  const isClient = useIsClient();

  useEffect(() => {
    hydrateRegionFromCookie();
  }, [hydrateRegionFromCookie]);

  const currentRegion: Region = isClient ? region : DEFAULT_REGION;
  const regionalInfo = product.regions[currentRegion] ?? product.regions[DEFAULT_REGION];

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
        {product.isNew && (
          <div className="absolute left-3 top-3 z-10 bg-[#C5B39B] px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#121110]">
            Nouveau
          </div>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm uppercase tracking-[0.1em] text-[#EAE8E3] md:text-base">
          {product.name}
        </h3>

        <p className="font-serif text-lg text-[#C5B39B] transition-opacity duration-300">
          {!isClient ? '...' : formattedPrice}
        </p>
      </div>
    </Link>
  );
}