import Image from "next/image";
import Link from "next/link";

export default function UrbanCollectionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brands/21-wear/02_urban_collection.jpg"
            alt="Collection Urban ZONE 21"
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
            Urban Collection
          </h1>
        </div>
      </section>

      {/* 2. INTRO / TEXTE SEO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        <div className="flex flex-col justify-center gap-10">
          <span className="font-sans text-[0.65rem] tracking-[0.4em] text-[#121110]/40 uppercase">
            Le Mouvement & La Ville
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-[#121110] leading-[1.2]">
            L’énergie de la rue<br />
            La précision du style
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection Urban de ZONE 21</strong> exprime la dimension
              la plus vive, la plus mobile et la plus instinctive de la marque.
              Inspirée par la ville, son énergie, ses contrastes et son rythme,
              cette ligne propose des <strong>vêtements streetwear</strong> et des
              silhouettes contemporaines pensées pour celles et ceux qui vivent le
              style comme une extension naturelle de leur attitude.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Urban est née d’un environnement en mouvement. La rue,
              l’architecture, les flux, la culture visuelle, le son, la vitesse et
              l’expression individuelle nourrissent chaque pièce de la collection.
              Chez ZONE 21, la <strong>mode urbaine</strong> n’est pas seulement
              une esthétique : c’est une manière d’être présent, de se déplacer et
              de construire une identité forte dans un monde dense et changeant.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection Urban</strong> rassemble des vêtements conçus
              pour conjuguer impact visuel, confort et liberté. Les coupes peuvent
              être plus audacieuses, les volumes plus affirmés, les détails plus
              visibles, mais l’ensemble reste toujours maîtrisé. Chaque pièce
              participe à une silhouette pensée pour le quotidien, capable
              d’accompagner aussi bien l’intensité de la ville que l’envie de
              singularité de celles et ceux qui la portent.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Dans l’univers ZONE 21, Urban occupe une place centrale : celle de
              la présence immédiate. La collection valorise les contrastes, les
              superpositions, les lignes qui captent le regard et les pièces qui
              imposent une allure sans effort apparent. Le résultat est un
              vestiaire urbain construit pour bouger, pour durer et pour porter
              une identité claire.
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-[#EAE8E3]">
          <Image
            src="https://images.unsplash.com/photo-1510912192135-c34098f98d5c?q=80&w=1200&auto=format&fit=crop"
            alt="Détail de la collection Urban ZONE 21"
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
            Pourquoi choisir Urban
          </span>

          <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
            La <strong>collection Urban ZONE 21</strong> est pensée pour celles
            et ceux qui recherchent une <strong>mode streetwear moderne</strong>,
            capable d’exprimer une énergie, une vision et une forme
            d’indépendance. Elle propose un vestiaire vivant, contemporain et
            structuré, où le confort rencontre l’impact visuel, et où chaque pièce
            contribue à construire une silhouette forte, libre et ancrée dans le
            présent.
          </p>
        </div>
      </section>

      {/* 4. CTA BOUTIQUE */}
      <section className="w-full bg-[#121110] py-32 px-6 text-center flex flex-col items-center justify-center gap-10 border-t border-white/10">
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/40 uppercase">
          Urban Collection
        </span>
        
        <Link href="/wear/urban/boutique" className="group flex flex-col items-center gap-6">
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