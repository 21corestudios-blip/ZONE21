import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/sections/home/Hero";
import EditorialManifesto from "@/components/sections/home/EditorialManifesto";
import MaisonGrid from "@/components/sections/home/MaisonGrid";

// SEO spécifique à la page d'accueil de la holding
export const metadata: Metadata = {
  title: "Accueil | ZONE 21",
  description: "Découvrez Zone 21 : L'architecture créative dédiée à l'émergence des maisons de demain. Explorez 21 Wear, 21 Core Studios et 21 Production.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#F7F5F0] selection:bg-[#121110] selection:text-[#F7F5F0] w-full">
      
      {/* 1. L'image Plein Écran */}
      <section id="hero" aria-label="Introduction">
        <Hero />
      </section>
      
      {/* 2. La section "Le Manifeste" */}
      <section id="manifeste" aria-label="Le Manifeste Zone 21">
        <EditorialManifesto />
      </section>

      {/* --- RESPIRATION VISUELLE 1 (Transition Clair -> Sombre) --- */}
      {/* aria-hidden="true" permet aux lecteurs d'écran d'ignorer cette section décorative */}
      <section className="relative w-full h-[50dvh] md:h-[70dvh] overflow-hidden" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Atmosphère Zone 21"
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Un léger voile sombre pour préparer l'œil au bloc noir qui suit */}
        <div className="absolute inset-0 bg-[#121110]/20 mix-blend-multiply pointer-events-none"></div>
      </section>
      
      {/* 3. La section Écosystème (L'ancien MaisonGrid) */}
      <section id="ecosysteme" aria-label="Nos Maisons">
        <MaisonGrid />
      </section>

      {/* --- RESPIRATION VISUELLE 2 (Transition Sombre -> Footer) --- */}
      <section className="relative w-full h-[40dvh] md:h-[60dvh] overflow-hidden bg-[#121110]" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Matière et Architecture"
          fill
          priority={false}
          className="object-cover object-center grayscale opacity-70"
          sizes="100vw"
        />
      </section>
      
    </main>
  );
}