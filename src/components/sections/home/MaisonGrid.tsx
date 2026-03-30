import Image from 'next/image';
import Link from 'next/link';

const paragraphClassName =
  'font-sans text-base font-light leading-relaxed text-white/70 md:text-lg';

export default function MaisonGrid() {
  return (
    <section className="w-full bg-[#121110] px-6 py-24 text-[#EAE8E3] md:px-12 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-16 md:gap-24 lg:grid-cols-2">
        <div className="order-2 relative min-h-[420px] w-full overflow-hidden bg-[#2A2826] lg:order-1 lg:min-h-0">
          <div className="relative h-full w-full lg:absolute lg:inset-0">
            <Image
              src="/images/home/editorial/Ecosysteme.jpg"
              alt="L'Écosystème Zone 21"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
            />
          </div>
        </div>

        <div className="order-1 flex flex-col justify-between gap-10 lg:order-2 lg:py-6">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-white/50">
              Les Maisons Zone 21
            </span>

            <h2 className="font-serif text-3xl leading-[1.2] text-white md:text-5xl">
              Notre
              <br />
              Écosystème.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className={paragraphClassName}>
              Zone 21 n’est pas une entité figée.
              <br />
              C’est un écosystème vivant, pensé comme un territoire d’expression, de création et
              d’influence.
            </p>

            <p className={paragraphClassName}>
              Chaque Maison y déploie sa vision, son langage, son rythme.
              <br />
              Mode, expérience, culture, présence physique : autant de formes qui prolongent une
              même ambition.
            </p>

            <p className={paragraphClassName}>
              Au cœur de cet ensemble, une ligne demeure invariable :
              <br />
              l’exigence absolue, la maîtrise du détail, et le refus de tout compromis.
            </p>

            <p className={paragraphClassName}>
              Zone 21 réunit des univers distincts, mais guidés par une même volonté :
              <br />
              concevoir avec justesse, élever les standards, et inscrire chaque geste dans une
              vision plus large.
            </p>

            <div className="pt-8">
              <Link
                href="/ecosysteme"
                className="inline-flex items-center justify-center bg-[#EAE8E3] px-8 py-4 text-[#121110] transition-colors duration-500 hover:bg-white"
              >
                <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.25em]">
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