import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { wearData } from '@/data/wear.data';

export const metadata: Metadata = {
  title: '21 WEAR',
  description: "Découvrez 21 Wear, la maison de prêt-à-porter de l'écosystème Zone 21.",
  alternates: {
    canonical: '/wear',
  },
  openGraph: {
    title: "21 WEAR | L'Essence de la Matière",
    description: "Découvrez 21 Wear, la maison de prêt-à-porter de l'écosystème Zone 21.",
    url: '/wear',
    siteName: 'ZONE 21',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function WearPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <section className="relative h-[60dvh] w-full overflow-hidden bg-[#121110] md:h-[70dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={wearData.hero.image}
            alt="Campagne 21 Wear"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply" />

        <div className="absolute bottom-10 left-0 z-30 flex w-full justify-center px-6 md:bottom-16">
          <h1 className="whitespace-nowrap font-serif text-2xl font-light tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-5xl lg:text-6xl">
            {wearData.hero.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-28">
          {wearData.collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              aria-label={`Découvrir la collection ${collection.name}`}
              className="group flex cursor-pointer flex-col"
            >
              <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden bg-[#EAE8E3]">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
              </div>

              <div className="flex items-center justify-center px-2 text-center">
                <h2 className="font-sans text-sm uppercase tracking-[0.2em] text-[#121110] transition-colors duration-500 group-hover:text-[#121110]/70 md:text-base">
                  {collection.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}