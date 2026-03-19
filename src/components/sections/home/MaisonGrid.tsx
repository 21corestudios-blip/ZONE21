import Image from "next/image";
import Link from "next/link";

export default function MaisonGrid() {
  return (
    <section className="w-full bg-[#121110] text-[#EAE8E3] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        
        {/* COLONNE GAUCHE : IMAGE */}
        <div className="relative w-full overflow-hidden bg-[#2A2826] order-2 lg:order-1 min-h-[420px] lg:min-h-0">
          <div className="relative h-full w-full lg:absolute lg:inset-0">
            <Image
              src="/images/home/editorial/Ecosysteme.jpg"
              alt="L'Écosystème Zone 21"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>

        {/* COLONNE DROITE : TEXTE */}
        <div className="flex flex-col justify-between gap-10 order-1 lg:order-2 lg:py-6">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/50 uppercase">
              Les Maisons Zone 21
            </span>

            <h2 className="font-serif text-3xl md:text-5xl text-white leading-[1.2]">
              Notre
              <br />
              Écosystème.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-white/70 font-light">
              Zone 21 n’est pas une entité figée.
              <br />
              C’est un écosystème vivant, pensé comme un territoire d’expression, de création et d’influence.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-white/70 font-light">
              Chaque Maison y déploie sa vision, son langage, son rythme.
              <br />
              Mode, expérience, culture, présence physique : autant de formes qui prolongent une même ambition.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-white/70 font-light">
              Au cœur de cet ensemble, une ligne demeure invariable :
              <br />
              l’exigence absolue, la maîtrise du détail, et le refus de tout compromis.
            </p>

            <p className="font-sans text-base md:text-lg leading-relaxed text-white/70 font-light">
              Zone 21 réunit des univers distincts, mais guidés par une même volonté :
              <br />
              concevoir avec justesse, élever les standards, et inscrire chaque geste dans une vision plus large.
            </p>

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