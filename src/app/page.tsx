import Hero from "@/components/sections/home/Hero";
import EditorialManifesto from "@/components/sections/home/EditorialManifesto";
import MaisonGrid from "@/components/sections/home/MaisonGrid";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#F7F5F0] selection:bg-[#121110] selection:text-[#F7F5F0]">
      
      {/* 1. L'image Plein Écran (qui avait disparu) */}
      <Hero />
      
      {/* 2. La section "Le Manifeste" (sur laquelle vous atterrissiez) */}
      <EditorialManifesto />
      
      {/* 3. La grille des Maisons */}
      <MaisonGrid />
      
    </main>
  );
}