import Image from "next/image";
import Link from "next/link";
import { wearData } from "@/data/wear.data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "21 WEAR | L'Essence de la Matière",
  description: "Découvrez 21 Wear, la maison de prêt-à-porter de l'écosystème Zone 21.",
};

export default function WearPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. LE HERO DE LA MARQUE */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        <div className="absolute inset-0 z-0">
          <Image
            src={wearData.hero.image}
            alt="Campagne 21 Wear"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg">
            {wearData.hero.title}
          </h1>
        </div>
      </section>

      {/* 2. LA GRILLE DES COLLECTIONS */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-28">
          {wearData.collections.map((collection) => (
            <Link href={collection.href} key={collection.id} className="group cursor-pointer flex flex-col">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EAE8E3] mb-8">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none"></div>
              </div>
              <div className="flex items-center justify-center text-center px-2">
                <h2 className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-[#121110] transition-colors duration-500 group-hover:text-[#121110]/70">
                  {collection.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
