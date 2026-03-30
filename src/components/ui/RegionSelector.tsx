'use client';

import { useEffect } from 'react';

import { useCartStore } from '@/store/cartStore';
import useIsClient from '@/hooks/useIsClient';

const REGIONS = ['EU', 'US'] as const;

export default function RegionSelector() {
  const { region, setRegion, hydrateRegionFromCookie } = useCartStore();
  const isClient = useIsClient();

  useEffect(() => {
    hydrateRegionFromCookie();
  }, [hydrateRegionFromCookie]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 font-sans text-[0.6rem] tracking-[0.2em] text-[#EAE8E3]/50">
      <span>RÉGION :</span>

      <div className="flex gap-3" role="group" aria-label="Sélection de la région">
        {REGIONS.map((currentRegion) => {
          const isActive = region === currentRegion;

          return (
            <button
              key={currentRegion}
              type="button"
              onClick={() => setRegion(currentRegion)}
              aria-pressed={isActive}
              className={`transition-colors hover:text-[#C5B39B] ${
                isActive ? 'font-bold text-[#C5B39B] underline underline-offset-4' : ''
              }`}
            >
              {currentRegion}
            </button>
          );
        })}
      </div>
    </div>
  );
}