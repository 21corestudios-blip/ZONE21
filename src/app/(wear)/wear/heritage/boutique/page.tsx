"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

// Les données enrichies pour les filtres
const products = [
  { id: 1, name: "Casquette Héritage", subtitle: "Noir / Coton", price: "45€", priceNum: 45, category: "Accessoires", gender: "Unisexe", color: "Noir", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", isNew: true },
  { id: 2, name: "Snapback Transmission", subtitle: "Noir / Structure classique", price: "49€", priceNum: 49, category: "Accessoires", gender: "Unisexe", color: "Noir", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Trucker Fraternité", subtitle: "Noir / Maille respirante", price: "45€", priceNum: 45, category: "Accessoires", gender: "Unisexe", color: "Noir", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Bonnet Mémoire", subtitle: "Noir / Maille douce", price: "39€", priceNum: 39, category: "Accessoires", gender: "Unisexe", color: "Noir", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Tote Bag Racines", subtitle: "Écru / Toile robuste", price: "35€", priceNum: 35, category: "Accessoires", gender: "Unisexe", color: "Beige", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Polo Héritage", subtitle: "Noir / Maille piquée", price: "75€", priceNum: 75, category: "Vêtements", gender: "Homme", color: "Noir", image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "T-Shirt Transmission", subtitle: "Noir / 100% coton", price: "65€", priceNum: 65, category: "Tee-shirts", gender: "Homme", color: "Noir", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "T-Shirt Oversized Fraternité", subtitle: "Noir / Coupe ample", price: "75€", priceNum: 75, category: "Tee-shirts", gender: "Unisexe", color: "Noir", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "Jogging Racines", subtitle: "Noir / Molleton premium", price: "95€", priceNum: 95, category: "Vêtements", gender: "Homme", color: "Noir", image: "https://images.unsplash.com/photo-1506629905607-d9b1c31f3c84?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Sweat Mémoire", subtitle: "Noir / Coupe régulière", price: "110€", priceNum: 110, category: "Sweats", gender: "Homme", color: "Noir", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "Hoodie Héritage", subtitle: "Noir / Intérieur molletonné", price: "120€", priceNum: 120, category: "Sweats", gender: "Homme", color: "Noir", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop" },
];

export default function HeritageBoutiquePage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [activeGender, setActiveGender] = useState("Tous");
  const [activeColor, setActiveColor] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState(150);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== "Tous" && product.category !== activeCategory) return false;
      if (activeGender !== "Tous" && product.gender !== activeGender && product.gender !== "Unisexe") return false;
      if (activeColor !== "Tous" && product.color !== activeColor) return false;
      if (product.priceNum > maxPrice) return false;
      return true;
    });
  }, [activeCategory, activeGender, activeColor, maxPrice]);

  return (
    <div className="flex flex-col min-h-screen bg-[#121110]">
      
      {/* 1. EN-TÊTE DE LA BOUTIQUE */}
      <section className="w-full pt-40 pb-16 px-6 text-center flex flex-col items-center gap-6 border-b border-white/10">
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/50 uppercase">
          Heritage Collection
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-white">
          La Transmission
        </h1>
      </section>

      {/* 2. LE CATALOGUE (Menu latéral + Grille de produits) */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LA SIDEBAR (Filtres Interactifs) */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-32 flex flex-col gap-10">
              
              {/* Filtre : Catégories */}
              <div>
                <h3 className="font-serif text-xl text-white mb-6">Catégories</h3>
                <ul className="flex flex-col gap-3">
                  {["Tous", "Vêtements", "Sweats", "Tee-shirts", "Accessoires"].map((cat) => (
                    <li key={cat}>
                      <button 
                        onClick={() => setActiveCategory(cat)}
                        className={`font-sans text-[0.7rem] tracking-widest uppercase text-left transition-colors ${activeCategory === cat ? "text-white font-bold" : "text-white/50 hover:text-white"}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filtre : Genre */}
              <div>
                <h3 className="font-serif text-xl text-white mb-6">Pour qui</h3>
                <ul className="flex flex-col gap-3">
                  {["Tous", "Homme", "Femme"].map((gen) => (
                    <li key={gen}>
                      <button 
                        onClick={() => setActiveGender(gen)}
                        className={`font-sans text-[0.7rem] tracking-widest uppercase text-left transition-colors ${activeGender === gen ? "text-white font-bold" : "text-white/50 hover:text-white"}`}
                      >
                        {gen}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filtre : Couleur */}
              <div>
                <h3 className="font-serif text-xl text-white mb-6">Couleur</h3>
                <ul className="flex flex-col gap-3">
                  {["Tous", "Noir", "Blanc", "Gris", "Beige"].map((col) => (
                    <li key={col}>
                      <button 
                        onClick={() => setActiveColor(col)}
                        className={`font-sans text-[0.7rem] tracking-widest uppercase text-left transition-colors ${activeColor === col ? "text-white font-bold" : "text-white/50 hover:text-white"}`}
                      >
                        {col}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filtre : Prix (Slider) */}
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-xl text-white">Prix max : {maxPrice}€</h3>
                <input 
                  type="range" 
                  min="30" 
                  max="150" 
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              {/* Bouton pour tout réinitialiser */}
              <button 
                onClick={() => {
                  setActiveCategory("Tous"); setActiveGender("Tous"); setActiveColor("Tous"); setMaxPrice(150);
                }}
                className="mt-4 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors text-left underline decoration-white/20 underline-offset-4"
              >
                Réinitialiser les filtres
              </button>

            </div>
          </aside>

          {/* LA GRILLE DES PRODUITS FILTRÉS */}
          <div className="flex-1">
            {filteredProducts.length === 0 && (
              <div className="w-full py-20 text-center flex flex-col gap-4">
                <p className="font-serif text-2xl text-white/50">Aucune pièce ne correspond à votre recherche.</p>
                <button onClick={() => { setActiveCategory("Tous"); setActiveGender("Tous"); setActiveColor("Tous"); setMaxPrice(150); }} className="font-sans text-xs uppercase tracking-widest text-white underline underline-offset-4">Voir toute la collection</button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-16">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col gap-4 cursor-pointer">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1a1918]">
                    <Image
                      src={product.image}
                      alt={`${product.name} - Heritage Collection`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-white text-[#121110] font-sans text-[0.55rem] tracking-widest uppercase px-3 py-1 z-10">
                        Nouveau
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-start pt-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-sm tracking-wider uppercase text-white group-hover:text-white/70 transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-sans text-xs text-white/50">
                        {product.subtitle}
                      </span>
                    </div>
                    <span className="font-sans text-sm text-white">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}