"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/data/products.data";

export default function ProductPrice({ product }: { product: Product }) {
  const { region } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pendant le rendu serveur ou avant l'hydratation, on affiche le prix EU par défaut
  const currentRegion = mounted ? region : "EU";
  const info = product.regions[currentRegion];

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: info.currency
  }).format(info.price);

  return (
    <div className="flex flex-col gap-2">
      <p className={`font-sans text-2xl text-[#C5B39B] font-light transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
        {formattedPrice}
      </p>
      {mounted && (
        <span className="font-sans text-[0.6rem] text-[#EAE8E3]/30 uppercase tracking-[0.1em]">
          Taxes incluses — Expédition {currentRegion === "EU" ? "Europe" : "International"}
        </span>
      )}
    </div>
  );
}