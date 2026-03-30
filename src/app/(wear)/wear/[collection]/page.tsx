import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Icon from '@/components/ui/Icon';

type Props = {
  params: Promise<{ collection: string }>;
};

type LookbookEntry = {
  title: string;
  subtitle: string;
  image: string;
  description: string;
};

const lookbookData: Record<string, LookbookEntry> = {
  classic: {
    title: 'Classic Collection',
    subtitle: "L'élégance intemporelle.",
    image: '/images/brands/21-wear/01_classic_collection.jpg',
    description:
      'Des coupes parfaites, des matières nobles. La collection Classic est le fondement de la garde-robe Zone 21. Une approche puriste où chaque ligne est justifiée, pensée pour traverser les saisons avec une autorité naturelle et un confort absolu.',
  },
  urban: {
    title: 'Urban Collection',
    subtitle: 'Le mouvement perpétuel.',
    image: '/images/brands/21-wear/02_urban_collection.jpg',
    description:
      "Conçue pour l'énergie de la ville. La collection Urban fusionne l'esthétique streetwear avec l'exigence sartoriale. Des volumes oversize maîtrisés, des détails utilitaires et une allure radicale pour ceux qui dictent leur propre rythme.",
  },
  heritage: {
    title: 'Heritage Collection',
    subtitle: "L'empreinte du passé.",
    image: '/images/brands/21-wear/03_heritage_collection.jpg',
    description:
      "Un hommage à nos archives et au savoir-faire brut. Heritage revisite les pièces iconiques avec des traitements vintage, des délavages uniques et des textures qui racontent une histoire. Le luxe de l'usure maîtrisée.",
  },
  studio: {
    title: 'Studio Collection',
    subtitle: 'La vision par Elena.',
    image: '/images/brands/21-wear/03_studio_collection.jpg',
    description:
      "Le laboratoire expérimental de 21 Wear. Une capsule en édition limitée où les conventions sautent. Pièces conceptuelles, asymétries et matières inattendues : le Studio est l'expression la plus pure de notre direction artistique.",
  },
};

export function generateStaticParams() {
  return [
    { collection: 'classic' },
    { collection: 'urban' },
    { collection: 'heritage' },
    { collection: 'studio' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const collectionKey = resolvedParams.collection.toLowerCase();
  const data = lookbookData[collectionKey];

  if (!data) {
    return {
      title: 'Collection introuvable | 21 Wear',
    };
  }

  return {
    title: `${data.title} | Lookbook 21 Wear`,
    description: data.description,
    alternates: {
      canonical: `/wear/${collectionKey}`,
    },
    openGraph: {
      title: `${data.title} | Lookbook 21 Wear`,
      description: data.description,
      url: `/wear/${collectionKey}`,
      siteName: 'ZONE 21',
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: data.image,
          alt: `Campagne ${data.title}`,
        },
      ],
    },
  };
}

export default async function LookbookPage({ params }: Props) {
  const resolvedParams = await params;
  const collectionKey = resolvedParams.collection.toLowerCase();
  const data = lookbookData[collectionKey];

  if (!data) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#121110]">
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={data.image}
          alt={`Campagne ${data.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#121110]/20 via-transparent to-[#121110]" />

        <div className="absolute bottom-16 left-0 z-20 flex w-full flex-col items-center px-6 text-center md:px-12">
          <span className="mb-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-[#C5B39B] md:text-[0.75rem]">
            {data.subtitle}
          </span>

          <h1 className="mb-8 font-serif text-4xl leading-none text-[#EAE8E3] drop-shadow-lg md:text-6xl lg:text-7xl">
            {data.title}
          </h1>

          <div className="animate-bounce text-[#EAE8E3]/50" aria-hidden="true">
            <Icon size={24}>
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </Icon>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center bg-[#121110] px-6 py-24 text-center md:py-32">
        <p className="mb-16 font-sans text-base font-light leading-relaxed text-[#EAE8E3]/80 md:text-xl lg:text-2xl">
          {data.description}
        </p>

        <Link
          href={`/wear/${collectionKey}/boutique`}
          className="group relative inline-flex items-center justify-center overflow-hidden bg-[#C5B39B] px-8 py-5 text-[#121110] transition-all duration-500 hover:bg-[#EAE8E3]"
          aria-label={`Découvrir les pièces de la collection ${data.title}`}
        >
          <span className="relative z-10 flex items-center gap-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.25em]">
            Découvrir les pièces
            <Icon
              size={16}
              className="transform transition-transform duration-300 group-hover:translate-x-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </Icon>
          </span>
        </Link>
      </section>
    </main>
  );
}