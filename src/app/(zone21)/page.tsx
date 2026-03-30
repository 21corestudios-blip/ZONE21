import type { Metadata } from 'next';
import Image from 'next/image';

import EditorialManifesto from '@/components/sections/home/EditorialManifesto';
import Hero from '@/components/sections/home/Hero';
import MaisonGrid from '@/components/sections/home/MaisonGrid';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    "Découvrez Zone 21 : l'architecture créative dédiée à l'émergence des maisons de demain. Explorez 21 Wear, 21 Core Studios et 21 Production.",
  openGraph: {
    title: "ZONE 21 | L'Exigence pour Signature",
    description:
      "Découvrez Zone 21 : l'architecture créative dédiée à l'émergence des maisons de demain. Explorez 21 Wear, 21 Core Studios et 21 Production.",
    url: '/',
    siteName: 'ZONE 21',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZONE 21 | L'Exigence pour Signature",
    description:
      "Découvrez Zone 21 : l'architecture créative dédiée à l'émergence des maisons de demain. Explorez 21 Wear, 21 Core Studios et 21 Production.",
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F7F5F0] selection:bg-[#121110] selection:text-[#F7F5F0]">
      <section id="hero" aria-label="Introduction">
        <Hero />
      </section>

      <section id="manifeste" aria-label="Le manifeste Zone 21">
        <EditorialManifesto />
      </section>

      <section
        className="relative h-[50dvh] w-full overflow-hidden md:h-[70dvh]"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#121110]/20 mix-blend-multiply" />
      </section>

      <section id="ecosysteme" aria-label="Nos maisons">
        <MaisonGrid />
      </section>

      <section
        className="relative h-[40dvh] w-full overflow-hidden bg-[#121110] md:h-[60dvh]"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover object-center grayscale opacity-70"
          sizes="100vw"
        />
      </section>
    </main>
  );
}