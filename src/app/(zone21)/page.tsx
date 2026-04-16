import type { Metadata } from 'next';

import EditorialManifesto from '@/components/sections/home/EditorialManifesto';
import Hero from '@/components/sections/home/Hero';
import ImmersiveImageSection from '@/components/sections/home/ImmersiveImageSection';
import MaisonGrid from '@/components/sections/home/MaisonGrid';
import SplitShowcaseSection from '@/components/sections/home/SplitShowcaseSection';

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

      <ImmersiveImageSection
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        alt=""
        imageClassName="object-cover object-center"
        overlayClassName="bg-[#121110]/20 mix-blend-multiply"
      />

      <section id="ecosysteme" aria-label="Nos maisons">
        <MaisonGrid />
      </section>

      <ImmersiveImageSection
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
        alt=""
        backgroundClassName="bg-[#121110]"
        imageClassName="object-cover object-center grayscale opacity-70"
      />

      <SplitShowcaseSection
        eyebrow="À Propos"
        title="Les Origines."
        paragraphs={[
          "Zone 21 est née d’une conviction profonde : les forces les plus puissantes émergent souvent dans des lieux que l’on raconte trop vite, alors qu’ils portent déjà une discipline, une intensité et une vision rares.",
          'Pensée comme une entité tournée vers la conception, la vision et la construction d’univers durables, Zone 21 transforme ces influences premières en langage, en esthétique et en structure.',
        ]}
        imageSrc="/images/home/a_propos/photo_texte.jpg"
        imageAlt="L'exigence Zone 21"
        imagePosition="right"
        theme="light"
        ctaHref="/a-propos"
        ctaLabel="Découvrir la Vision"
        imageClassName="object-cover grayscale transition-all duration-[1400ms] hover:grayscale-0"
      />

      <ImmersiveImageSection
        src="/images/home/a_propos/en-tete.jpg"
        alt=""
        backgroundClassName="bg-[#121110]"
        imageClassName="object-cover object-[center_20%]"
        overlayClassName="bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/65 mix-blend-multiply"
      />

      <SplitShowcaseSection
        eyebrow="Contact"
        title="Entrer dans la Zone."
        paragraphs={[
          'Pour une collaboration, une demande de création sur mesure ou toute question concernant nos univers, Zone 21 reçoit chaque prise de contact avec exigence, discrétion et attention.',
          'Chaque échange ouvre un espace de travail où la direction artistique, la stratégie et la production avancent avec une même précision.',
        ]}
        imageSrc="/images/contact/contact 2.jpg"
        imageAlt="Studio Zone 21"
        imagePosition="left"
        theme="light"
        ctaHref="/contact"
        ctaLabel="Nous Contacter"
        imageClassName="object-cover transition-all duration-[1400ms]"
      />

      <ImmersiveImageSection
        src="/images/contact/contact.jpg"
        alt=""
        backgroundClassName="bg-[#121110]"
        imageClassName="object-cover object-[center_20%] opacity-90"
        overlayClassName="bg-gradient-to-b from-transparent via-[#121110]/20 to-[#121110]/85 mix-blend-multiply"
      />
    </main>
  );
}
