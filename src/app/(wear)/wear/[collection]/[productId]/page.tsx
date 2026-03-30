import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AddToCartForm from '@/components/ui/AddToCartForm';
import Icon from '@/components/ui/Icon';
import ProductPrice from '@/components/ui/ProductPrice';
import { wearProducts } from '@/data/products.data';

type Props = {
  params: Promise<{ collection: string; productId: string }>;
};

function formatCollectionLabel(collection: string): string {
  return collection.charAt(0).toUpperCase() + collection.slice(1);
}

export function generateStaticParams() {
  return wearProducts.map((product) => ({
    collection: product.collection,
    productId: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = resolvedParams.productId;
  const product = wearProducts.find((item) => item.id === productId);

  if (!product) {
    return { title: 'Produit introuvable | 21 Wear' };
  }

  return {
    title: `${product.name} | 21 Wear`,
    description: `Achetez ${product.name} de la collection ${formatCollectionLabel(product.collection)}.`,
    alternates: {
      canonical: `/wear/${product.collection}/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | 21 Wear`,
      description: `Achetez ${product.name} de la collection ${formatCollectionLabel(product.collection)}.`,
      url: `/wear/${product.collection}/${product.id}`,
      siteName: 'ZONE 21',
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const collectionKey = resolvedParams.collection.toLowerCase();
  const productId = resolvedParams.productId;

  const product = wearProducts.find((item) => item.id === productId);

  if (!product || product.collection !== collectionKey) {
    notFound();
  }

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#121110] px-6 pb-20 pt-32 md:px-12 lg:px-24">
      <nav aria-label="Breadcrumb" className="mx-auto mb-8 w-full max-w-7xl">
        <ol className="flex items-center space-x-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#EAE8E3]/50">
          <li>
            <Link href="/wear" className="transition-colors hover:text-[#EAE8E3]">
              21 Wear
            </Link>
          </li>

          <li>
            <span className="mx-2">/</span>
          </li>

          <li>
            <Link
              href={`/wear/${product.collection}/boutique`}
              className="transition-colors hover:text-[#EAE8E3]"
            >
              {formatCollectionLabel(product.collection)}
            </Link>
          </li>

          <li>
            <span className="mx-2">/</span>
          </li>

          <li className="text-[#C5B39B]" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1918]">
          {product.isNew && (
            <div className="absolute left-4 top-4 z-10 bg-[#C5B39B] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#121110]">
              Nouveau
            </div>
          )}

          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <section className="flex flex-col justify-center" aria-labelledby="product-title">
          <div className="mb-8 border-b border-[#EAE8E3]/10 pb-8">
            <h1
              id="product-title"
              className="mb-4 font-serif text-3xl leading-tight text-[#EAE8E3] md:text-5xl"
            >
              {product.name}
            </h1>

            <ProductPrice product={product} />
          </div>

          <div className="prose prose-invert mb-10">
            <p className="font-sans font-light leading-relaxed text-[#EAE8E3]/70">
              Conçu avec une exigence absolue, ce vêtement incarne la vision de Zone 21.
            </p>

            <ul className="mt-4 space-y-2 font-sans text-sm text-[#EAE8E3]/60">
              <li>• Collection : {formatCollectionLabel(product.collection)}</li>
              <li>• Catégorie : {product.category}</li>
            </ul>
          </div>

          <AddToCartForm product={product} />

          <div className="mt-8 flex flex-col gap-3 font-sans text-[0.65rem] tracking-[0.1em] text-[#EAE8E3]/50">
            <div className="flex items-center gap-2">
              <Icon size={14}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </Icon>
              <span>Production à la demande — Haute qualité</span>
            </div>

            <div className="flex items-center gap-2">
              <Icon size={14}>
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                <path d="M12 3v6" />
              </Icon>
              <span>Retours acceptés sous 14 jours</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}