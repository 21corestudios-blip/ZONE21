"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";
import RegionSelector from "@/components/ui/RegionSelector"; // Import du sélecteur

export default function HeaderWear() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  // Gestion du scroll pour l'effet de transparence
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-700 ${
          isScrolled 
            ? "bg-[#121110]/90 backdrop-blur-md py-4 border-b border-[#EAE8E3]/5" 
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* GAUCHE : Navigation Collections */}
          <nav className="hidden lg:flex items-center gap-8">
            {['classic', 'urban', 'heritage', 'studio'].map((col) => (
              <Link
                key={col}
                href={`/wear/${col}`}
                className="text-[0.6rem] uppercase tracking-[0.25em] text-[#EAE8E3]/60 hover:text-[#C5B39B] transition-colors"
              >
                {col}
              </Link>
            ))}
          </nav>

          {/* CENTRE : Logo */}
          <Link href="/wear" className="absolute left-1/2 -translate-x-1/2 group">
            <div className="flex flex-col items-center">
              <span className="font-serif text-xl md:text-2xl tracking-[0.1em] text-[#EAE8E3]">
                ZONE 21
              </span>
              <span className="text-[0.5rem] tracking-[0.5em] uppercase text-[#C5B39B] mt-1">
                Wear
              </span>
            </div>
          </Link>

          {/* DROITE : Sélecteur de Région + Panier */}
          <div className="flex items-center gap-8">
            
            {/* --- AJOUT DU SÉLECTEUR ICI --- */}
            <div className="hidden md:block">
              <RegionSelector />
            </div>

            {/* Bouton Panier */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#EAE8E3] hover:text-[#C5B39B] transition-colors group"
            >
              <Icon size={20}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </Icon>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5B39B] text-[#121110] text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Le tiroir du panier */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}