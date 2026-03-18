"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// On remonte d'un dossier (../) pour aller chercher le tiroir du menu global
import NavigationDrawer from "../NavigationDrawer";

export default function HeaderWear() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // L'état d'ouverture du menu

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
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          
          {/* GROUPE GAUCHE : Le Logo et les Collections */}
          <div className="flex items-center gap-12 lg:gap-16">
            <Link href="/wear" className="flex-shrink-0 hover:opacity-80 transition-opacity duration-500">
              <Image 
                src="/images/ui/logo_signature_or.png" // --- LOGO 21 WEAR (À remplacer par votre propre logo si besoin) ---
                alt="21 WEAR" 
                width={280} // Largeur du logo (ajustez selon votre image)
                height={80} // Hauteur du logo (ajustez selon votre image)
                priority
                className="w-auto h-10 md:h-12" // Classe pour ajuster la taille du logo (ajustez selon vos besoins) pour diviser par 2 = h-5 md:h-6
              />
            </Link>

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

          {/* GROUPE DROIT : Retour, Séparateur et Menu */}
          <div className="flex items-center justify-end">
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-500">
                Retour Zone 21
              </Link>
              <span className="w-[1px] h-3 bg-white/20"></span>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500"
              >
                Menu
              </button>
            </nav>

            {/* LE BOUTON HAMBURGER (Uniquement sur Mobile) */}
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

      {/* LE TIROIR DE NAVIGATION (Qui s'ouvre au clic) */}
      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}