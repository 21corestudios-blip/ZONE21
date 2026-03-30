"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products.data";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { region } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Sécurité pour l'hydratation : on attend que le client soit prêt 
  // pour lire la région stockée dans le localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  // Récupération des infos selon la région (par défaut EU si pas encore monté)
  const currentRegion = mounted ? region : "EU";
  const regionalInfo = product.regions[currentRegion];

  // Formatage dynamique du prix et de la devise
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: regionalInfo.currency,
  }).format(regionalInfo.price);

  return (
    <Link
      href={`/wear/${product.collection}/${product.id}`}
      className="group flex flex-col gap-4"
    >
      {/* Ratio fixe pour la cohérence de la grille */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1918]">
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10 bg-[#C5B39B] text-[#121110] px-3 py-1 text-[0.55rem] uppercase tracking-[0.2em] font-bold">
            Nouveau
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-sans text-sm md:text-base text-[#EAE8E3] uppercase tracking-[0.1em]">
          {product.name}
        </h3>
        <p className="font-serif text-lg text-[#C5B39B] transition-opacity duration-300">
          {!mounted ? "..." : formattedPrice}
        </p>
      </div>
    </Link>
  );
}