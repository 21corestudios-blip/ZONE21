import Image from "next/image";
import Link from "next/link";
import { homeData } from "@/data/home.data";

export default function MaisonGrid() {
  const { maisons } = homeData;

  return (
    // Le fond passe à l'encre pour un effet théâtral et faire ressortir les images
    <section className="relative w-full bg-[#121110] py-32 md:py-48 px-6 md:px-12 border-t border-white/5">
      
      {/* En-tête de la section */}
      <div className="max-w-7xl mx-auto mb-20 md:mb-32 flex flex-col items-center text-center">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-white/50 mb-6 block">
          Notre Écosystème
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
          Les Maisons Zone 21
        </h2>
      </div>

      {/* La Grille "Masonry" (Asymétrique) 
        Sur mobile : 1 colonne. Sur Desktop : 4 colonnes, et on joue sur les col-span/row-span des items.
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {maisons.map((maison) => (
          <Link 
            key={maison.id} 
            href={maison.href}
            className={`group relative block overflow-hidden bg-[#1a1918] ${maison.gridClass}`}
          >
            {/* 1. L'Image avec effet de zoom très lent au survol */}
            <Image
              src={maison.image.src}
              alt={maison.image.alt}
              fill
              className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-70 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* 2. Le Voile noir pour garantir la lecture du texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-[#121110]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-1000"></div>

            {/* 3. Le Contenu Texte (remonte légèrement au survol) */}
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
  );
}