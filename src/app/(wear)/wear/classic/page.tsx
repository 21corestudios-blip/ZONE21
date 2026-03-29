import Image from "next/image";
import Link from "next/link";

export default function ClassicCollectionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brands/21-wear/01_classic_collection.jpg"
            alt="Collection Classic ZONE 21"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg animate-fade-in-up">
            Classic Collection.
          </h1>
        </div>
      </section>

      {/* 2. INTRO / TEXTE SEO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        <div className="flex flex-col justify-center gap-10">
          <span className="font-sans text-[0.65rem] tracking-[0.4em] text-[#121110]/40 uppercase">
            L'Essence de Z21
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-[#121110] leading-[1.2]">
            La collection iconique<br />
            L’essentiel selon Z21
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection Classic de ZONE 21</strong> incarne l’essence
              d’un vestiaire intemporel, moderne et structuré. Pensée pour celles
              et ceux qui recherchent des <strong>vêtements essentiels</strong>,
              durables et faciles à associer, cette collection rassemble les
              fondamentaux de la marque dans une vision sobre, forte et actuelle.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Avec Classic, ZONE 21 développe une approche du style fondée sur
              l’équilibre. Les coupes sont nettes, les volumes sont maîtrisés, les
              matières sont choisies pour leur confort et leur tenue, et chaque
              pièce trouve naturellement sa place dans le quotidien. Ce sont des
              vêtements conçus pour durer, accompagner le mouvement et construire
              une silhouette cohérente saison après saison.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection de vêtements Classic</strong> s’adresse à
              celles et ceux qui veulent investir dans des pièces fiables, bien
              pensées et immédiatement portables. Sweatshirts, t-shirts, hoodies,
              pantalons ou vestes s’inscrivent dans une logique simple : proposer
              une mode qui ne dépend pas de l’effet de nouveauté, mais de la
              justesse du design.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Dans l’univers ZONE 21, le classique n’est jamais banal. Il exprime
              une forme de précision, une manière d’aller à l’essentiel pour faire
              émerger une identité forte sans en faire trop. Choisir Classic,
              c’est choisir des <strong>vêtements intemporels</strong> capables de
              traverser les tendances tout en conservant une présence moderne.
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-[#EAE8E3]">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
            alt="Détail de la collection Classic ZONE 21"
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
            Pourquoi choisir Classic
          </span>

          <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
            La <strong>collection Classic ZONE 21</strong> est pensée comme une
            base solide pour construire un style durable, minimaliste et affirmé.
            Chaque pièce peut se porter seule ou en superposition, dans une logique
            de vestiaire cohérent, élégant et facile à vivre. C’est là que commence
            le vrai style : dans la qualité des essentiels, dans la cohérence des
            lignes et dans la force silencieuse des vêtements les mieux conçus.
          </p>
        </div>
      </section>

      {/* 4. CTA BOUTIQUE */}
      <section className="w-full bg-[#121110] py-32 px-6 text-center flex flex-col items-center justify-center gap-10 border-t border-white/10">
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/40 uppercase">
          Classic Collection
        </span>
        
        <Link href="/wear/classic/boutique" className="group flex flex-col items-center gap-6">
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