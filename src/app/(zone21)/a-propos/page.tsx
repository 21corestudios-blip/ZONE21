import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    "Découvrez la vision fondatrice de Zone 21, son origine, ses influences et les valeurs qui structurent son écosystème créatif.",
  alternates: {
    canonical: '/a-propos',
  },
  openGraph: {
    title: 'À Propos | ZONE 21',
    description:
      "Découvrez la vision fondatrice de Zone 21, son origine, ses influences et les valeurs qui structurent son écosystème créatif.",
    url: '/a-propos',
    siteName: 'ZONE 21',
    locale: 'fr_FR',
    type: 'website',
  },
};

const valueCardClassName = 'flex flex-col gap-4';

const valueTextClassName =
  'pr-0 font-sans text-sm font-light leading-relaxed text-white/70 md:pr-8';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <section className="relative h-[60dvh] w-full overflow-hidden bg-[#121110] md:h-[70dvh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/a_propos/en-tete.jpg"
            alt="Architecture Zone 21"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply" />

        <div className="absolute bottom-10 left-0 z-30 flex w-full justify-center px-6 md:bottom-16">
          <h1 className="animate-fade-in-up whitespace-nowrap font-serif text-2xl font-light tracking-wide text-white drop-shadow-lg sm:text-3xl md:text-5xl lg:text-6xl">
            Notre Vision.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-16 px-6 py-24 md:gap-24 md:px-12 md:py-32 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-10">
          <h2 className="font-serif text-3xl leading-[1.2] text-[#121110] md:text-5xl">
            Les Origines
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-base font-light leading-relaxed text-[#121110]/80 md:text-lg">
              Zone 21 est née d’une conviction profonde. Les forces les plus puissantes émergent
              souvent dans des lieux que l’on regarde mal ou que l’on raconte trop vite. Là où
              certains ne voient que des marges, il existe pourtant une discipline, une fraternité,
              un respect et une intensité capables de faire naître des artistes, des visions et des
              trajectoires singulières.
            </p>

            <p className="font-sans text-base font-light leading-relaxed text-[#121110]/80 md:text-lg">
              Dès l’origine, cette intuition a trouvé un écho auprès de premières présences dont
              l’énergie a accompagné l’élan du projet. HEKA et AXION, à travers la musique, la
              production et une même exigence créative, ont participé à installer une première
              vibration. Elena Davalon y a apporté une sensibilité visuelle ancrée dans
              l’expression urbaine et le geste libre. Naya Delmare, par son approche du bien-être
              et de la pensée positive, a ouvert un autre espace, plus intérieur, plus lumineux,
              mais tout aussi essentiel à l’équilibre de l’ensemble.
            </p>

            <p className="font-sans text-base font-light leading-relaxed text-[#121110]/80 md:text-lg">
              Ces premières affinités n’ont pas simplement entouré Zone 21, elles ont contribué à
              en révéler l’attitude, le souffle et la direction. Chacun, à sa manière, a incarné
              une dimension du projet et participé à faire émerger un univers où la création, la
              conscience, le style et la profondeur ne s’opposent jamais.
            </p>

            <p className="font-sans text-base font-light leading-relaxed text-[#121110]/80 md:text-lg">
              Pensée comme une entité entièrement tournée vers la conception, la vision et la
              construction d’univers durables, Zone 21 transforme ces influences premières en
              langage, en esthétique et en structure. Elle donne forme à des marques et à des
              projets qui cherchent plus qu’une présence immédiate, des univers capables de
              s’inscrire dans le temps avec cohérence, exigence et autorité naturelle.
            </p>
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden bg-[#EAE8E3] aspect-[4/5] lg:aspect-auto">
          <Image
            src="/images/home/a_propos/photo_texte.jpg"
            alt="L'exigence Zone 21"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
          />
        </div>
      </section>

      <section className="w-full bg-[#121110] px-6 py-24 text-[#EAE8E3] md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8 md:text-left">
          <article className={valueCardClassName}>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
              01
            </span>
            <h3 className="font-serif text-2xl tracking-wide">L&apos;Exigence</h3>
            <p className={valueTextClassName}>
              Tout commence par une sélection rigoureuse. Les matières, les talents et les mots
              sont choisis avec précision pour donner naissance à des univers capables de durer.
            </p>
          </article>

          <article className={valueCardClassName}>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
              02
            </span>
            <h3 className="font-serif text-2xl tracking-wide">La Vision</h3>
            <p className={valueTextClassName}>
              Regarder devant sans rompre avec l’essentiel. Zone 21 imagine des projets ancrés dans
              leur temps, mais guidés par des codes qui ne s’effacent pas.
            </p>
          </article>

          <article className={valueCardClassName}>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
              03
            </span>
            <h3 className="font-serif text-2xl tracking-wide">L&apos;Autorité</h3>
            <p className={valueTextClassName}>
              Créer une présence qui s’impose sans bruit. Des univers désirables, cohérents et
              maîtrisés, portés par une force calme et une évidence durable.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}