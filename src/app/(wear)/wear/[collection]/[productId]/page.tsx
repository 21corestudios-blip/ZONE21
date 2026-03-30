import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { wearProducts } from "@/data/products.data";
import Icon from "@/components/ui/Icon";
import AddToCartForm from "@/components/ui/AddToCartForm"; 
// NOUVEL IMPORT
import ProductPrice from "@/components/ui/ProductPrice";
import type { Metadata } from "next";

type Props = { params: Promise<{ collection: string, productId: string }> };

export function generateStaticParams() {
  return wearProducts.map((product) => ({
    collection: product.collection,
    productId: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = wearProducts.find((p) => p.id === resolvedParams.productId);
  if (!product) return { title: "Produit introuvable | 21 Wear" };

  return {
    title: `${product.name} | 21 Wear`,
    description: `Achetez ${product.name} de la collection ${product.collection}.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = wearProducts.find((p) => p.id === resolvedParams.productId);

  if (!product || product.collection !== resolvedParams.collection) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-[#121110]">
      
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto w-full mb-8">
        <ol className="flex items-center space-x-2 text-[0.65rem] font-sans uppercase tracking-[0.2em] text-[#EAE8E3]/50">
          <li><Link href="/wear" className="hover:text-[#EAE8E3] transition-colors">21 Wear</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link href={`/wear/${product.collection}/boutique`} className="hover:text-[#EAE8E3] transition-colors">{product.collection}</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-[#C5B39B]" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        <div className="relative aspect-[3/4] w-full bg-[#1a1918] overflow-hidden">
          {product.isNew && (
            <div className="absolute top-4 left-4 z-10 bg-[#C5B39B] text-[#121110] px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] font-bold">
              Nouveau
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          
          <div className="mb-8 border-b border-[#EAE8E3]/10 pb-8">
            <h1 className="font-serif text-3xl md:text-5xl text-[#EAE8E3] leading-tight mb-4">
              {product.name}
            </h1>
            
            {/* REMPLACEMENT DU PRIX STATIQUE PAR LE COMPOSANT DYNAMIQUE */}
            <ProductPrice product={product} />
          </div>

          <div className="prose prose-invert mb-10">
            <p className="font-sans text-[#EAE8E3]/70 font-light leading-relaxed">
              Conçu avec une exigence absolue, ce vêtement incarne la vision de Zone 21. 
            </p>
            <ul className="mt-4 font-sans text-sm text-[#EAE8E3]/60 space-y-2">
              <li>• Collection : {product.collection.toUpperCase()}</li>
              <li>• Catégorie : {product.category}</li>
            </ul>
          </div>

          <AddToCartForm product={product} />

          <div className="mt-8 flex flex-col gap-3 font-sans text-[0.65rem] tracking-[0.1em] text-[#EAE8E3]/50">
            <div className="flex items-center gap-2">
              <Icon size={14}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></Icon>
              <span>Production à la demande — Haute qualité</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon size={14}><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></Icon>
              <span>Retours acceptés sous 14 jours</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}