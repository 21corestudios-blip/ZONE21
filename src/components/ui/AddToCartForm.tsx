'use client';

import { useState } from 'react';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { Product } from '@/data/products.data';
import { useCartStore } from '@/store/cartStore';

interface AddToCartFormProps {
  product: Product;
}

const sizes = ['S', 'M', 'L', 'XL'] as const;

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille.');
      return;
    }

    addItem(product, selectedSize);

    alert(`${product.name} (Taille ${selectedSize}) ajouté au panier !`);
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#EAE8E3]/80">
          Taille
        </span>

        <button
          type="button"
          className="font-sans text-[0.65rem] tracking-[0.1em] text-[#EAE8E3]/50 underline transition-colors hover:text-[#C5B39B]"
        >
          Guide des tailles
        </button>
      </div>

      <div
        className="mb-8 grid grid-cols-4 gap-3"
        role="radiogroup"
        aria-label="Sélection de la taille"
      >
        {sizes.map((size) => {
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedSize(size)}
              className={`border py-3 font-sans text-sm outline-none transition-colors ${
                isSelected
                  ? 'border-[#C5B39B] bg-[#C5B39B]/10 text-[#C5B39B]'
                  : 'border-[#EAE8E3]/20 text-[#EAE8E3] hover:border-[#C5B39B] hover:text-[#C5B39B]'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      <Button
        variant="primary"
        size="lg"
        className="group flex w-full items-center justify-between"
        onClick={handleAddToCart}
      >
        <span>Ajouter au panier</span>

        <Icon size={18} className="transform transition-transform group-hover:translate-x-2">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </Icon>
      </Button>
    </div>
  );
}