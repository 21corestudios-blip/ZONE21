import Image from "next/image";
import Link from "next/link";

export default function StudioCollectionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brands/21-wear/04_studio_collection.jpg"
            alt="Collection Studio ZONE 21"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg animate-fade-in-up">
            Studio Collection
          </h1>
        </div>
      </section>

      {/* 2. INTRO / TEXTE SEO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        <div className="flex flex-col justify-center gap-10">
          <span className="font-sans text-[0.65rem] tracking-[0.4em] text-[#121110]/40 uppercase">
            Le Laboratoire Créatif
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-[#121110] leading-[1.2]">
            La mode comme manifeste<br />
            La création comme signature
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection Studio de ZONE 21</strong> représente
              l’espace le plus créatif, le plus prospectif et le plus artistique de
              la marque. Imaginée dans l’univers d’<strong>Elene Davalon</strong>,
              influenceuse IA et pionnière du street art, cette collection propose
              une vision du vêtement comme territoire d’expérimentation, de
              narration visuelle et d’expression identitaire.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Studio n’est pas une simple ligne mode. C’est un laboratoire
              esthétique. Une zone de recherche où la silhouette se construit à
              partir d’idées, de contrastes, de matières et d’intentions fortes. À
              travers cette collection, ZONE 21 développe une proposition plus
              conceptuelle, plus libre et plus avant-gardiste, tout en restant
              connectée à la réalité du porté et à la puissance de l’image.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              L’empreinte d’<strong>Elene Davalon</strong> donne à la
              <strong> collection Studio</strong> une dimension singulière. Son
              positionnement d’influenceuse IA et son statut de pionnière du street
              art nourrissent une direction créative qui dépasse les codes
              habituels du vêtement. Ici, la mode dialogue avec l’art urbain, la
              culture visuelle, l’innovation et l’identité numérique.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Dans l’univers ZONE 21, Studio incarne la création en mouvement.
              C’est la collection où les codes se déplacent, où les influences
              artistiques rencontrent l’univers digital, et où le vêtement devient
              une forme de manifeste. Elle s’adresse à celles et ceux qui
              recherchent une mode plus expressive, plus pointue et plus
              visionnaire.
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-[#EAE8E3]">
          <Image
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
            alt="Détail de la collection Studio ZONE 21"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
      </section>

      {/* 3. BLOC SEO COMPLEMENTAIRE */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="border-t border-[#121110]/10 pt-12 flex flex-col gap-6">
          <span className="font-sans text-[0.65rem] tracking-[0.35em] text-[#121110]/40 uppercase">
            Pourquoi choisir Studio
          </span>

          <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
            La <strong>collection Studio ZONE 21</strong> est pensée pour celles
            et ceux qui veulent explorer une mode créative, expérimentale et
            fortement identitaire. À la croisée du street art, de l’innovation
            digitale et de l’univers visuel d’<strong>Elene Davalon</strong>,
            Studio propose un vestiaire audacieux où chaque pièce devient une
            extension d’univers, une signature et une prise de position esthétique.
          </p>
        </div>
      </section>

      {/* 4. CTA BOUTIQUE */}
      <section className="w-full bg-[#121110] py-32 px-6 text-center flex flex-col items-center justify-center gap-10 border-t border-white/10">
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/40 uppercase">
          Studio Collection
        </span>
        
        <Link href="/wear/studio/boutique" className="group flex flex-col items-center gap-6">
          <h2 className="font-serif text-3xl md:text-5xl text-white transition-transform duration-700 group-hover:-translate-y-2">
            Découvrir la collection
          </h2>
          <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors border-b border-white/30 group-hover:border-white pb-1">
            Entrer dans la boutique
          </span>
        </Link>
      </section>
    </div>
  );
}