"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavigationDrawer from "./NavigationDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled 
            ? "py-4 bg-[#121110]/90 backdrop-blur-md border-b border-white/5 shadow-sm" 
            : "py-8 bg-transparent border-transparent"
        }`}
      >
        {/* MODIFICATION ICI : On utilise w-full au lieu de max-w-7xl pour un affichage bord à bord */}
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          
          {/* GROUPE GAUCHE : Logo + Menu */}
          <div className="flex items-center gap-12 lg:gap-16">
            
            {/* 1. LE LOGO (Poussé à l'extrême gauche grâce au w-full du parent) */}
            <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity duration-500">
              {/* Le Logo en image SVG */}
              <Image 
                src="/images/ui/logo-zone21-light.svg" 
                alt="ZONE 21" 
                width={140} 
                height={40} 
                priority
                className="w-auto h-5 md:h-6"
              />
              
              {/* Fallback texte si pas d'image : */}
              {/* <span className="font-serif text-2xl tracking-widest text-white">ZONE 21</span> */}
            </Link>

            {/* 2. LE MENU GAUCHE (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/about" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                La Maison
              </Link>
              <Link href="/brands" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                Écosystème
              </Link>
              <Link href="/a-propos" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                À Propos
              </Link>
            </nav>
          </div>

          {/* GROUPE DROIT : "Contact" + "Menu" + Hamburger */}
          <div className="flex items-center justify-end">
            
            {/* 3. LE MENU DROIT (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/contact" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500">
                Contact
              </Link>
              
              <span className="w-[1px] h-3 bg-white/20"></span>

              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500"
              >
                Menu
              </button>
            </nav>

            {/* 4. LE MENU HAMBURGER (Mobile) */}
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