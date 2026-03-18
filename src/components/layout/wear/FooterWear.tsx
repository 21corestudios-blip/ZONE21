"use client";

import Link from "next/link";
import Image from "next/image";

export default function FooterWear() {
  return (
    <footer className="bg-[#121110] text-[#EAE8E3] border-t border-white/5 pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-8 flex flex-col gap-8">
            <Link href="/wear" className="inline-block hover:opacity-80 transition-opacity duration-500">
              <Image 
                src="/images/ui/logo_signature_or.png" 
                alt="21 WEAR" 
                width={240} 
                height={60} 
                className="w-auto h-7 md:h-8"
              />
            </Link>
            
            <p className="font-sans text-sm md:text-base leading-relaxed text-white/60 max-w-sm font-light">
              L'Essence de la matière. Une collection structurée pour traverser les époques avec autorité.
            </p>
            
            <form className="mt-4 flex flex-col gap-4 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="emailWear" className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
                Accès Avant-Première
              </label>
              <div className="relative border-b border-white/20 pb-2 flex items-center transition-colors duration-500 focus-within:border-white/60">
                <input 
                  type="email" 
                  id="emailWear" 
                  placeholder="Votre adresse email" 
                  className="bg-transparent w-full font-sans text-sm text-white placeholder-white/30 focus:outline-none"
                />
                <button type="submit" className="text-[0.65rem] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300">
                  S'inscrire
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6 md:pl-12">
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/40 mb-2">
              Service Client
            </span>
            <Link href="/wear/livraison" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-300">
              Livraison & Retours
            </Link>
            <Link href="/wear/guide-tailles" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-300">
              Guide des Tailles
            </Link>
            <Link href="/contact" className="font-sans text-sm text-white/70 hover:text-white transition-colors duration-300 mt-4 md:mt-0">
              Nous Contacter
            </Link>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4 text-center md:text-left">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.1em] text-white/30">
            © {new Date().getFullYear()} 21 WEAR. Tous droits réservés.
          </span>
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.1em] text-white/30">
            Une marque de la Maison <Link href="/" className="text-white/50 hover:text-white transition-colors">Zone 21</Link>
          </span>
        </div>

      </div>
    </footer>
  );
}