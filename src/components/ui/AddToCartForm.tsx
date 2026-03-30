"use client";

import { useState } from "react";
import { Product } from "@/data/products.data";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

interface AddToCartFormProps {
  product: Product;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille.");
      return;
    }
    // On envoie au cerveau Zustand !
    addItem(product, selectedSize);
    
    // Feedback UX (temporaire avant de faire un vrai slide-out cart)
    alert(`${product.name} (Taille ${selectedSize}) ajouté au panier !`);
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#EAE8E3]/80">Taille</span>
        <button type="button" className="font-sans text-[0.65rem] tracking-[0.1em] text-[#EAE8E3]/50 hover:text-[#C5B39B] underline transition-colors">
          Guide des tailles
        </button>
      </div>
      
      {/* SÉLECTEUR DE TAILLE */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {sizes.map((size) => (
          <button 
            key={size}
            type="button"
            onClick={() => setSelectedSize(size)}
            className={`py-3 font-sans text-sm transition-colors outline-none border ${
              selectedSize === size 
                ? "border-[#C5B39B] text-[#C5B39B] bg-[#C5B39B]/10" 
                : "border-[#EAE8E3]/20 text-[#EAE8E3] hover:border-[#C5B39B] hover:text-[#C5B39B]"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* BOUTON D'AJOUT */}
      <Button 
        variant="primary" 
        size="lg" 
        className="w-full flex justify-between items-center group"
        onClick={handleAddToCart}
      >
        <span>Ajouter au panier</span>
        <Icon size={18} className="transform group-hover:translate-x-2 transition-transform">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </Icon>
      </Button>
    </div>
  );
}