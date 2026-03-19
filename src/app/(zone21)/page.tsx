import Hero from "@/components/sections/home/Hero";
import EditorialManifesto from "@/components/sections/home/EditorialManifesto";
import MaisonGrid from "@/components/sections/home/MaisonGrid";
import Image from "next/image"; // <-- Ne pas oublier l'import ici !

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#F7F5F0] selection:bg-[#121110] selection:text-[#F7F5F0]">
      
      {/* 1. L'image Plein Écran */}
      <Hero />
      
      {/* 2. La section "Le Manifeste" */}
      <EditorialManifesto />

      {/* --- RESPIRATION VISUELLE 1 (Transition Clair -> Sombre) --- */}
      <section className="relative w-full h-[50dvh] md:h-[70dvh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Atmosphère Zone 21"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Un léger voile sombre pour préparer l'œil au bloc noir qui suit */}
        <div className="absolute inset-0 bg-[#121110]/20 mix-blend-multiply pointer-events-none"></div>
      </section>
      
      {/* 3. La section Écosystème (L'ancien MaisonGrid) */}
      <MaisonGrid />

      {/* --- RESPIRATION VISUELLE 2 (Transition Sombre -> Footer) --- */}
      <section className="relative w-full h-[40dvh] md:h-[60dvh] overflow-hidden bg-[#121110]">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Matière et Architecture"
          fill
          className="object-cover object-center grayscale opacity-70"
          sizes="100vw"
        />
      </section>
      
    </main>
  );
}