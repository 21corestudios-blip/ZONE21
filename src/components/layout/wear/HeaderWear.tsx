"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// ⚠️ Attention : Si tu veux un menu mobile spécifique pour les vêtements, 
// il faudra créer un composant NavigationDrawerWear plus tard !
import NavigationDrawer from "@/components/layout/NavigationDrawer"; 
import { useCartStore } from "@/store/cartStore";

export default function HeaderWear() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled 
            ? "py-4 bg-[#121110]/90 backdrop-blur-md border-b border-white/5 shadow-sm" 
            : "py-8 bg-transparent border-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          
          {/* GROUPE GAUCHE : Logo + Menu Desktop */}
          <div className="flex items-center gap-12 lg:gap-16">
            
            {/* 1. LE LOGO (Corrigé pour être visible) */}
            <Link href="/wear" className="flex-shrink-0 hover:opacity-80 transition-opacity duration-500">
              <Image 
                src="/images/ui/logo_signature_or.png"
                alt="21 WEAR" 
                width={150} 
                height={50} 
                priority
                // object-contain empêche l'image d'être écrasée ou coupée
                className="object-contain h-10 md:h-12 w-auto" 
              />
            </Link>

            {/* 2. LE MENU GAUCHE (Desktop) - Liens restaurés */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/wear/classic" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                Classic
              </Link>
              <Link href="/wear/urban" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                Urban
              </Link>
              <Link href="/wear/heritage" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                Heritage
              </Link>
              <Link href="/wear/studio" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                Studio
              </Link>
            </nav>
          </div>

          {/* GROUPE DROIT : Panier + Menu + Hamburger */}
          <div className="flex items-center justify-end gap-6 lg:gap-8">
            
            {/* 3. LE PANIER */}
            <Link href="/wear/cart" className="flex items-center gap-2 group">
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors duration-500">
                Panier
              </span>
              {mounted && cartItemCount > 0 && (
                <span className="bg-[#C5B39B] text-[#121110] text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full transition-all">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <span className="hidden md:block w-[1px] h-3 bg-white/20"></span>

            {/* 4. BOUTON MENU */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="hidden md:block text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500"
            >
              Menu
            </button>

            {/* 5. MENU HAMBURGER */}
            <div className="md:hidden flex">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Ouvrir le menu"
                className="flex flex-col gap-[5px] p-2"
              >
                <span className="w-5 h-[1px] bg-white transition-transform duration-500"></span>
                <span className="w-5 h-[1px] bg-white transition-transform duration-500"></span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Le Tiroir de navigation latéral */}
      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}