import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO (Image texturée sombre, texte ancré en bas) */}
      <section className="relative w-full h-[60dvh] md:h-[70dvh] overflow-hidden bg-[#121110]">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/a_propos/en-tete.jpg"
            alt="Architecture Zone 21"
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="100vw"
            quality={100}
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#121110]/10 to-[#121110]/80 mix-blend-multiply pointer-events-none"></div>

        <div className="absolute bottom-10 md:bottom-16 left-0 w-full z-30 px-6 flex justify-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide whitespace-nowrap drop-shadow-lg animate-fade-in-up">
            Notre Vision.
          </h1>
        </div>

      </section>

      {/* 2. LE MANIFESTE (Avec votre nouveau texte et l'image qui s'aligne) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-stretch">
        
        {/* Colonne Texte */}
        <div className="flex flex-col justify-center gap-10">
          <h2 className="font-serif text-3xl md:text-5xl text-[#121110] leading-[1.2]">
            Les Origines
          </h2>
          <div className="flex flex-col gap-6">
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Zone 21 est née d’une conviction profonde. Les forces les plus puissantes émergent souvent dans des lieux que l’on regarde mal ou que l’on raconte trop vite. Là où certains ne voient que des marges, il existe pourtant une discipline, une fraternité, un respect et une intensité capables de faire naître des artistes, des visions et des trajectoires singulières.
            </p>
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Dès l’origine, cette intuition a trouvé un écho auprès de premières présences dont l’énergie a accompagné l’élan du projet. HEKA et AXION, à travers la musique, la production et une même exigence créative, ont participé à installer une première vibration. Elena Davalon y a apporté une sensibilité visuelle ancrée dans l’expression urbaine et le geste libre. Naya Delmare, par son approche du bien-être et de la pensée positive, a ouvert un autre espace, plus intérieur, plus lumineux, mais tout aussi essentiel à l’équilibre de l’ensemble.
            </p>
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Ces premières affinités n’ont pas simplement entouré Zone 21, elles ont contribué à en révéler l’attitude, le souffle et la direction. Chacun, à sa manière, a incarné une dimension du projet et participé à faire émerger un univers où la création, la conscience, le style et la profondeur ne s’opposent jamais.
            </p>
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#121110]/80 font-light">
              Pensée comme une entité entièrement tournée vers la conception, la vision et la construction d’univers durables, Zone 21 transforme ces influences premières en langage, en esthétique et en structure. Elle donne forme à des marques et à des projets qui cherchent plus qu’une présence immédiate, des univers capables de s’inscrire dans le temps avec cohérence, exigence et autorité naturelle.
            </p>
          </div>
        </div>

        {/* Colonne Image (S'étire pour matcher la hauteur des 3 paragraphes) */}
        <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-[#EAE8E3]">
          <Image 
            src="/images/home/a_propos/photo_texte.jpg" 
            alt="L'exigence Zone 21" 
            fill 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>

      </section>

      {/* 3. LES VALEURS */}
      <section className="w-full bg-[#121110] text-[#EAE8E3] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] text-white/50 uppercase">01</span>
            <h3 className="font-serif text-2xl tracking-wide">L'Exigence</h3>
            <p className="font-sans text-sm leading-relaxed text-white/70 font-light pr-0 md:pr-8">
              Tout commence par une sélection rigoureuse. Les matières, les talents et les mots sont choisis avec précision pour donner naissance à des univers capables de durer.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] text-white/50 uppercase">02</span>
            <h3 className="font-serif text-2xl tracking-wide">La Vision</h3>
            <p className="font-sans text-sm leading-relaxed text-white/70 font-light pr-0 md:pr-8">
              Regarder devant sans rompre avec l’essentiel. Zone 21 imagine des projets ancrés dans leur temps, mais guidés par des codes qui ne s’effacent pas.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-[0.65rem] tracking-[0.2em] text-white/50 uppercase">03</span>
            <h3 className="font-serif text-2xl tracking-wide">L'Autorité</h3>
            <p className="font-sans text-sm leading-relaxed text-white/70 font-light pr-0 md:pr-8">
              Créer une présence qui s’impose sans bruit. Des univers désirables, cohérents et maîtrisés, portés par une force calme et une évidence durable.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}