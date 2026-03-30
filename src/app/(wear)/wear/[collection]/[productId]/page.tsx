import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AddToCartForm from '@/components/ui/AddToCartForm';
import Icon from '@/components/ui/Icon';
import ProductPrice from '@/components/ui/ProductPrice';
import {
  DEFAULT_REGION,
  getRegionalInfo,
  isProductAvailableForRegion,
  isProductFulfillmentReady,
  wearProducts,
} from '@/data/products.data';

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

  const fallbackRegion = DEFAULT_REGION;
  const regionalInfo = getRegionalInfo(product, fallbackRegion);
  const isRegionAvailable = isProductAvailableForRegion(product, fallbackRegion);
  const isFulfillmentReady = isProductFulfillmentReady(product, fallbackRegion);
  const isPurchasable = product.isActive && isRegionAvailable && isFulfillmentReady;

  const availabilityLabel = !product.isActive
    ? 'Indisponible'
    : isPurchasable
      ? 'Disponible'
      : 'Bientôt disponible';

  const availabilityMessage = !product.isActive
    ? 'Cette pièce est actuellement retirée de la vente.'
    : !isRegionAvailable
      ? `Cette pièce n’est pas disponible pour la région ${fallbackRegion}.`
      : !isFulfillmentReady
        ? 'La configuration de production et de fulfillment est en cours de finalisation pour cette pièce.'
        : 'Cette pièce est prête à la commande.';

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
          {product.isNew ? (
            <div className="absolute left-4 top-4 z-10 bg-[#C5B39B] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#121110]">
              Nouveau
            </div>
          ) : null}

          {!isPurchasable ? (
            <div className="absolute right-4 top-4 z-10 border border-white/15 bg-black/65 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              Bientôt disponible
            </div>
          ) : null}

          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover ${!isPurchasable ? 'opacity-85' : ''}`}
          />
        </div>

        <section className="flex flex-col justify-center" aria-labelledby="product-title">
          <div className="mb-8 border-b border-[#EAE8E3]/10 pb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="border border-[#EAE8E3]/15 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[#EAE8E3]/55">
                {formatCollectionLabel(product.collection)}
              </span>

              <span
                className={`px-3 py-1 font-sans text-[0.65rem] uppercase tracking-[0.18em] ${
                  isPurchasable
                    ? 'border border-[#C5B39B]/30 bg-[#C5B39B]/10 text-[#C5B39B]'
                    : 'border border-white/10 bg-white/[0.03] text-white/60'
                }`}
              >
                {availabilityLabel}
              </span>
            </div>

            <h1
              id="product-title"
              className="mb-4 font-serif text-3xl leading-tight text-[#EAE8E3] md:text-5xl"
            >
              {product.name}
            </h1>

            <ProductPrice product={product} />
          </div>

          <div className="mb-8 border border-white/10 bg-white/[0.03] p-5">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-white/45">
              État produit
            </p>

            <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/75">
              {availabilityMessage}
            </p>

            <div className="mt-4 flex flex-wrap gap-3 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-white/45">
              <span className="border border-white/10 px-3 py-1">
                Région de référence · {fallbackRegion}
              </span>
              <span className="border border-white/10 px-3 py-1">
                Devise · {regionalInfo.currency}
              </span>
              <span className="border border-white/10 px-3 py-1">
                SKU · {product.sku}
              </span>
            </div>
          </div>

          <div className="prose prose-invert mb-10">
            <p className="font-sans font-light leading-relaxed text-[#EAE8E3]/70">
              Conçu avec une exigence absolue, ce vêtement incarne la vision de Zone 21.
            </p>

            <ul className="mt-4 space-y-2 font-sans text-sm text-[#EAE8E3]/60">
              <li>• Collection : {formatCollectionLabel(product.collection)}</li>
              <li>• Catégorie : {product.category}</li>
              <li>• Tailles disponibles : {product.availableSizes.join(' · ')}</li>
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