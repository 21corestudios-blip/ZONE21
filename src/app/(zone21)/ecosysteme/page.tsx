import Image from "next/image";
import Link from "next/link";
import { homeData } from "@/data/home.data";

export default function EcosystemePage() {
  const { maisons } = homeData;

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO "AFFICHE DE CINÉMA" (Aligné sur Accueil et À Propos) */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        
        {/* L'Image de fond (J'ai mis une belle texture architecturale) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2071&auto=format&fit=crop"
            alt="Écosystème Zone 21"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={100}
          />
        </div>

        {/* Le voile dégradé pour que le texte se détache parfaitement */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply pointer-events-none"></div>

        {/* Le titre ancré en bas de page avec son animation */}
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg animate-fade-in-up">
            Notre Écosystème.
          </h1>
        </div>

      </section>

      {/* 2. VOTRE GRILLE (Totalement intacte) */}
      <section className="relative w-full bg-[#121110] py-32 md:py-48 px-6 md:px-12 border-t border-white/5">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {maisons.map((maison) => (
            <Link 
              key={maison.id} 
              href={maison.href}
              className={`group relative block overflow-hidden bg-[#1a1918] ${maison.gridClass}`}
            >
              {/* L'Image avec effet de zoom très lent au survol */}
              <Image
                src={maison.image.src}
                alt={maison.image.alt}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-70 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Le Voile noir pour garantir la lecture du texte */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-[#121110]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>

              {/* Le Contenu Texte (remonte légèrement au survol) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <span className="font-sans text-[0.55rem] uppercase tracking-[0.3em] text-white/60 mb-2">
                  {maison.category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide">
                  {maison.name}
                </h3>
              </div>
              
            </Link>
          ))}
        </div>
      </section>
      
    </div>
  );
}