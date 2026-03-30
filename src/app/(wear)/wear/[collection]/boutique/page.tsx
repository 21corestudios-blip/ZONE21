import { notFound } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { wearProducts } from "@/data/products.data";
import type { Metadata } from "next";

type Props = { params: Promise<{ collection: string }> };

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
  const collectionName = resolvedParams.collection.charAt(0).toUpperCase() + resolvedParams.collection.slice(1);
  return {
    title: `Boutique ${collectionName} | 21 Wear`,
    description: `Découvrez la collection ${collectionName} par la maison 21 Wear.`,
  };
}

export default async function BoutiqueCollectionPage({ params }: Props) {
  const resolvedParams = await params;
  const currentCollection = resolvedParams.collection;
  
  const products = wearProducts.filter((p) => p.collection === currentCollection);

  if (products.length === 0) {
    notFound();
  }

  const displayName = currentCollection.charAt(0).toUpperCase() + currentCollection.slice(1);

  return (
    <main className="flex flex-col w-full min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-[#121110]">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="mb-16 border-b border-[#EAE8E3]/10 pb-8">
          <SectionTitle
            subtitle="BOUTIQUE"
            title={`Collection ${displayName}`}
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </main>
  );
}