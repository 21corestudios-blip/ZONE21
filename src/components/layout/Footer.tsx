"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#121110] text-[#EAE8E3] border-t border-white/5 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* LA GRILLE DU FOOTER (Désormais 2 colonnes asymétriques) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* COLONNE 1 : La Marque & Le Club (Prend 8 colonnes sur 12) */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity duration-500">
              <Image 
                src="/images/ui/logo-zone21-light.svg" 
                alt="ZONE 21" 
                width={120} 
                height={30} 
                className="w-auto h-5 md:h-6"
              />
            </Link>
            <p className="font-sans text-sm md:text-base leading-relaxed text-white/60 max-w-sm font-light">
              L'architecture créative dédiée à l'émergence des maisons de demain.
            </p>
            
            {/* L'inscription Newsletter / Cercle Privé */}
            <form className="mt-4 flex flex-col gap-4 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                Rejoindre le Cercle
              </label>
              <div className="relative border-b border-white/20 pb-2 flex items-center transition-colors duration-500 focus-within:border-white/60">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Votre adresse email" 
                  className="bg-transparent w-full font-sans text-sm text-white placeholder-white/30 focus:outline-none"
                />
                <button type="submit" className="text-[0.65rem] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
                  S'inscrire
                </button>
              </div>
            </form>
          </div>

          {/* COLONNE 2 : La Maison (Prend les 4 colonnes restantes) */}
          <div className="md:col-span-4 flex flex-col gap-6 md:pl-12">
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40 mb-2">
              La Maison
            </span>
            <Link href="/a-propos" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-300">
              À Propos
            </Link>
            <Link href="/contact" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-300">
              Contact
            </Link>
            <Link href="/mentions-legales" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-300 mt-4 md:mt-0">
              Mentions Légales
            </Link>
          </div>

        </div>

        {/* LA LIGNE DE COPYRIGHT */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4 text-center md:text-left">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.1em] text-white/30">
            © {new Date().getFullYear()} Zone 21. Tous droits réservés.
          </span>
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.1em] text-white/30">
            Conçu par <Link href="/core-studios" className="text-white/50 hover:text-white transition-colors">21 Core Studios</Link>
          </span>
        </div>

      </div>
    </footer>
  );
}