import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { homeData } from '@/data/home.data';

export const metadata: Metadata = {
  title: 'Écosystème',
  description:
    "Découvrez l'écosystème Zone 21 à travers ses maisons, ses univers et ses expressions créatives.",
  alternates: {
    canonical: '/ecosysteme',
  },
  openGraph: {
    title: 'Écosystème | ZONE 21',
    description:
      "Découvrez l'écosystème Zone 21 à travers ses maisons, ses univers et ses expressions créatives.",
    url: '/ecosysteme',
    siteName: 'ZONE 21',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function EcosystemePage() {
  const { maisons } = homeData;

  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <section className="relative h-[60dvh] w-full overflow-hidden bg-[#121110] md:h-[70dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop"
            alt="Écosystème Zone 21"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply" />

        <div className="absolute bottom-10 left-0 z-30 flex w-full justify-center px-6 md:bottom-16">
          <h1 className="animate-fade-in-up whitespace-nowrap font-serif text-2xl font-light tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-5xl lg:text-6xl">
            Notre Écosystème.
          </h1>
        </div>
      </section>

      <section className="relative w-full border-t border-white/5 bg-[#121110] px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {maisons.map((maison) => (
            <Link
              key={maison.id}
              href={maison.href}
              aria-label={`Découvrir ${maison.name}`}
              className={`group relative block overflow-hidden bg-[#1a1918] ${maison.gridClass}`}
            >
              <Image
                src={maison.image.src}
                alt={maison.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-70 transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-[#121110]/20 to-transparent opacity-80 transition-opacity duration-1000 group-hover:opacity-60" />

              <div className="absolute inset-0 z-10 flex translate-y-4 flex-col justify-end p-8 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0">
                <span className="mb-2 font-sans text-[0.55rem] uppercase tracking-[0.3em] text-white/60">
                  {maison.category}
                </span>
                <h2 className="font-serif text-2xl tracking-wide text-white md:text-3xl">
                  {maison.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}