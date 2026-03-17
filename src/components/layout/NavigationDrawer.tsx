"use client";

import Link from "next/link";
import { useEffect } from "react";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationDrawer({ isOpen, onClose }: NavigationDrawerProps) {
  
  // Bloquer le scroll de la page quand le tiroir est ouvert (Détail UX crucial)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. LE VOILE (Backdrop) : Assombrit la page et permet de fermer au clic */}
      <div
        className={`fixed inset-0 z-[60] bg-[#121110]/40 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. LE TIROIR (Drawer) : Glisse depuis la droite */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#121110] z-[70] transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col border-l border-white/5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* En-tête du tiroir */}
        <div className="flex justify-between items-center p-6 md:p-12">
          <span className="font-serif text-xl tracking-widest text-white">ZONE 21</span>
          <button
            onClick={onClose}
            className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-500"
          >
            Fermer
          </button>
        </div>

        {/* Liens principaux (Typographie géante) */}
        <nav className="flex flex-col gap-6 px-6 md:px-12 mt-12 overflow-y-auto">
          {[
            { name: "La Maison", href: "/about" },
            { name: "Écosystème", href: "/brands" },
            { name: "Savoir-Faire", href: "/expertise" },
            { name: "Journal", href: "/journal" },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="group flex items-center w-max" 
              onClick={onClose}
            >
              {/* L'effet luxe : le texte glisse très légèrement vers la droite au survol */}
              <span className="font-serif text-4xl md:text-5xl text-white/90 font-light tracking-wide group-hover:translate-x-3 group-hover:text-white transition-all duration-500 ease-out">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer du tiroir (Liens utilitaires) */}
        <div className="mt-auto p-6 md:p-12 flex flex-col gap-6 border-t border-white/5">
          <Link href="/contact" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-500" onClick={onClose}>
            Contact & Presse
          </Link>
          <Link href="/login" className="text-[0.65rem] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-500" onClick={onClose}>
            Espace Client (Login)
          </Link>
        </div>
      </div>
    </>
  );
}