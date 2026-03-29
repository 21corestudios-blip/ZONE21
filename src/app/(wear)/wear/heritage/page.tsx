import Image from "next/image";
import Link from "next/link";

export default function HeritageCollectionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/brands/21-wear/03_heritage_collection.jpg"
            alt="Collection Heritage ZONE 21"
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
            Heritage Collection
          </h1>
        </div>
      </section>

      {/* 2. INTRO / TEXTE SEO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        <div className="flex flex-col justify-center gap-10">
          <span className="font-sans text-[0.65rem] tracking-[0.4em] text-[#121110]/40 uppercase">
            L’Empreinte des Générations
          </span>

          <h2 className="font-serif text-3xl md:text-5xl text-[#121110] leading-[1.2]">
            La mémoire du style<br />
            La force du présent
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection Heritage de ZONE 21</strong> célèbre la force
              des références durables, la mémoire du vêtement et l’élégance des
              pièces qui traversent le temps. Pensée comme un dialogue entre
              héritage et modernité, cette collection revisite les codes classiques
              pour leur donner une expression contemporaine, structurée et
              profondément identitaire.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Avec Heritage, ZONE 21 s’inspire des fondations du vestiaire : les
              coupes intemporelles, les matières de caractère, les silhouettes
              solides et les détails qui racontent quelque chose de vrai.
              L’objectif n’est pas de reproduire le passé, mais de le réinterpréter
              avec précision à travers une vision plus actuelle.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              La <strong>collection Heritage</strong> s’adresse à celles et ceux
              qui recherchent des <strong>vêtements authentiques</strong>, capables
              de transmettre une sensation de qualité, de profondeur et de
              présence. Chaque pièce est pensée pour durer dans le temps comme dans
              le regard, avec une esthétique plus enracinée, plus texturée et
              toujours maîtrisée.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Dans l’univers ZONE 21, l’héritage n’est jamais figé. Il devient une
              matière vivante, une base de création, une façon de construire un
              style avec plus de sens. Choisir Heritage, c’est choisir un vestiaire
              intemporel, cohérent et affirmé, où tradition et modernité avancent
              ensemble.
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-[#EAE8E3]">
          <Image
            src="https://images.unsplash.com/photo-1510912192135-c34098f98d5c?q=80&w=1200&auto=format&fit=crop"
            alt="Détail de la collection Heritage ZONE 21"
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
            Pourquoi choisir Heritage
          </span>

          <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
            La <strong>collection Heritage ZONE 21</strong> est pensée pour celles
            et ceux qui veulent construire un vestiaire durable, élégant et
            profondément identitaire. Elle valorise les pièces que l’on garde, que
            l’on porte longtemps et qui gagnent en personnalité au fil du temps.
            Entre authenticité, structure et modernité, Heritage propose une vision
            du style plus profonde, plus ancrée et plus durable.
          </p>
        </div>
      </section>

      {/* 4. CTA BOUTIQUE */}
      <section className="w-full bg-[#121110] py-32 px-6 text-center flex flex-col items-center justify-center gap-10 border-t border-white/10">
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/40 uppercase">
          Heritage Collection
        </span>
        
        <Link href="/wear/heritage/boutique" className="group flex flex-col items-center gap-6">
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