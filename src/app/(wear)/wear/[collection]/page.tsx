import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

type Props = { params: Promise<{ collection: string }> };

// 1. Les données éditoriales du Lookbook (Le Storytelling)
const lookbookData: Record<string, { title: string; subtitle: string; image: string; description: string }> = {
  classic: {
    title: "Classic Collection",
    subtitle: "L'élégance intemporelle.",
    image: "/images/brands/21-wear/01_classic_collection.jpg",
    description: "Des coupes parfaites, des matières nobles. La collection Classic est le fondement de la garde-robe Zone 21. Une approche puriste où chaque ligne est justifiée, pensée pour traverser les saisons avec une autorité naturelle et un confort absolu."
  },
  urban: {
    title: "Urban Collection",
    subtitle: "Le mouvement perpétuel.",
    image: "/images/brands/21-wear/02_urban_collection.jpg",
    description: "Conçue pour l'énergie de la ville. La collection Urban fusionne l'esthétique streetwear avec l'exigence sartoriale. Des volumes oversize maîtrisés, des détails utilitaires et une allure radicale pour ceux qui dictent leur propre rythme."
  },
  heritage: {
    title: "Heritage Collection",
    subtitle: "L'empreinte du passé.",
    image: "/images/brands/21-wear/03_heritage_collection.jpg",
    description: "Un hommage à nos archives et au savoir-faire brut. Heritage revisite les pièces iconiques avec des traitements vintage, des délavages uniques et des textures qui racontent une histoire. Le luxe de l'usure maîtrisée."
  },
  studio: {
    title: "Studio Collection",
    subtitle: "La vision par Elena.",
    image: "/images/brands/21-wear/03_studio_collection.jpg",
    description: "Le laboratoire expérimental de 21 Wear. Une capsule en édition limitée où les conventions sautent. Pièces conceptuelles, asymétries et matières inattendues : le Studio est l'expression la plus pure de notre direction artistique."
  }
};

// 2. Pré-génération statique
export function generateStaticParams() {
  return [
    { collection: 'classic' },
    { collection: 'urban' },
    { collection: 'heritage' },
    { collection: 'studio' },
  ];
}

// 3. SEO Dynamique
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const collectionKey = resolvedParams.collection.toLowerCase();
  const data = lookbookData[collectionKey];

  if (!data) return { title: "Collection introuvable | 21 Wear" };

  return {
    title: `${data.title} | Lookbook 21 Wear`,
    description: data.description,
  };
}

// 4. Le Composant Principal
export default async function LookbookPage({ params }: Props) {
  const resolvedParams = await params;
  const collectionKey = resolvedParams.collection.toLowerCase();
  const data = lookbookData[collectionKey];

  // Si l'utilisateur tape une collection qui n'existe pas
  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-[#121110] min-h-screen">
      
      {/* SECTION 1 : Le Hero Cover (Image Plein Écran) */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src={data.image}
          alt={`Campagne ${data.title}`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        
        {/* Voile sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121110]/20 via-transparent to-[#121110] pointer-events-none z-10"></div>

        {/* Le Titre ancré en bas du Hero */}
        <div className="absolute bottom-16 left-0 w-full z-20 px-6 md:px-12 flex flex-col items-center text-center">
          <span className="font-sans text-[0.65rem] md:text-[0.75rem] tracking-[0.3em] uppercase text-[#C5B39B] mb-4">
            {data.subtitle}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#EAE8E3] leading-none mb-8 drop-shadow-lg">
            {data.title}
          </h1>
          
          {/* L'icône de scroll animée pour inviter à descendre */}
          <div className="animate-bounce text-[#EAE8E3]/50">
            <Icon size={24}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></Icon>
          </div>
        </div>
      </section>

      {/* SECTION 2 : Le Manifeste de la collection & L'accès à la boutique */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center z-20 relative bg-[#121110]">
        
        <p className="font-sans text-base md:text-xl lg:text-2xl leading-relaxed text-[#EAE8E3]/80 font-light mb-16">
          {data.description}
        </p>

        {/* LE BOUTON CRUCIAL : Passage du Lookbook à la Boutique */}
        <Link 
          href={`/wear/${collectionKey}/boutique`}
          className="group relative inline-flex items-center justify-center px-8 py-5 bg-[#C5B39B] text-[#121110] overflow-hidden transition-all duration-500 hover:bg-[#EAE8E3]"
        >
          <span className="relative z-10 font-sans text-[0.75rem] tracking-[0.25em] uppercase font-bold flex items-center gap-3">
            Découvrir les pièces
            <Icon size={16} className="transform group-hover:translate-x-2 transition-transform duration-300">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </Icon>
          </span>
        </Link>
        
      </section>

    </main>
  );
}