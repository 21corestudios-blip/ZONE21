import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductCard from '@/components/ui/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { wearProducts } from '@/data/products.data';

type Props = {
  params: Promise<{ collection: string }>;
};

const validCollections = ['classic', 'urban', 'heritage', 'studio'] as const;

function formatCollectionName(collection: string): string {
  return collection.charAt(0).toUpperCase() + collection.slice(1);
}

export function generateStaticParams() {
  return validCollections.map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const collectionKey = resolvedParams.collection.toLowerCase();
  const collectionName = formatCollectionName(collectionKey);

  return {
    title: `Boutique ${collectionName} | 21 Wear`,
    description: `Découvrez la collection ${collectionName} par la maison 21 Wear.`,
    alternates: {
      canonical: `/wear/${collectionKey}/boutique`,
    },
    openGraph: {
      title: `Boutique ${collectionName} | 21 Wear`,
      description: `Découvrez la collection ${collectionName} par la maison 21 Wear.`,
      url: `/wear/${collectionKey}/boutique`,
      siteName: 'ZONE 21',
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export default async function BoutiqueCollectionPage({ params }: Props) {
  const resolvedParams = await params;
  const currentCollection = resolvedParams.collection.toLowerCase();

  const products = wearProducts.filter((product) => product.collection === currentCollection);

  if (products.length === 0) {
    notFound();
  }

  const displayName = formatCollectionName(currentCollection);

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#121110] px-6 pb-20 pt-32 md:px-12 lg:px-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 border-b border-[#EAE8E3]/10 pb-8">
          <SectionTitle subtitle="BOUTIQUE" title={`Collection ${displayName}`} align="left" />
        </div>

        <section
          aria-label={`Produits de la collection ${displayName}`}
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}