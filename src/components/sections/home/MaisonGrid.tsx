import Image from "next/image";
import Link from "next/link";

export default function MaisonGrid() {
  return (
    // Fond noir (bg-[#121110]) et texte clair (text-[#EAE8E3])
    <section className="w-full bg-[#121110] text-[#EAE8E3] py-24 md:py-32 px-6 md:px-12">
      
      {/* items-stretch pour que l'image fasse exactement la hauteur du texte */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        
        {/* COLONNE GAUCHE : L'IMAGE */}
        {/* On gère l'ordre sur mobile (order-2) et desktop (lg:order-1) pour toujours avoir l'image à gauche sur grand écran */}
        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-[#2A2826] order-2 lg:order-1">
          <Image 
            src="https://images.unsplash.com/photo-1600607688066-890987f18a86?q=80&w=1200&auto=format&fit=crop" 
            alt="L'Écosystème Zone 21" 
            fill 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>

        {/* COLONNE DROITE : LE TEXTE */}
        <div className="flex flex-col justify-center gap-10 order-1 lg:order-2 py-0 lg:py-10">
          
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/50 uppercase">
              Les Maisons Zone 21
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-[1.2]">
              Notre<br />Écosystème.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-white/70 font-light">
              Zone 21 n'est pas une simple entité, c'est un écosystème global. Un espace où chaque branche — de la mode à l'expérience physique — partage la même exigence de l'excellence et le même refus absolu du compromis.
            </p>
            
            {/* Le Bouton d'appel à l'action vers la nouvelle page */}
            <div className="pt-8">
              <Link 
                href="/ecosysteme" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#EAE8E3] text-[#121110] transition-colors duration-500 hover:bg-white"
              >
                <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-bold">
                  Découvrir les Maisons
                </span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}