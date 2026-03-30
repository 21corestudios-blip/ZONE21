"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function RegionSelector() {
  const { region, setRegion } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4 font-sans text-[0.6rem] tracking-[0.2em] text-[#EAE8E3]/50">
      <span>RÉGION :</span>
      <div className="flex gap-3">
        {(['EU', 'US', 'WORLD'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`transition-colors hover:text-[#C5B39B] ${
              region === r ? "text-[#C5B39B] font-bold underline underline-offset-4" : ""
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}