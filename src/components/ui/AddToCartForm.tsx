'use client';

import { useEffect, useMemo, useState } from 'react';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import {
  DEFAULT_REGION,
  type Product,
  type ProductSize,
  getRegionalInfo,
  isProductAvailableForRegion,
  isProductFulfillmentReady,
} from '@/data/products.data';
import useIsClient from '@/hooks/useIsClient';
import { useCartStore } from '@/store/cartStore';

interface AddToCartFormProps {
  product: Product;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const region = useCartStore((state) => state.region);
  const hydrateRegionFromCookie = useCartStore((state) => state.hydrateRegionFromCookie);
  const isClient = useIsClient();

  useEffect(() => {
    hydrateRegionFromCookie();
  }, [hydrateRegionFromCookie]);

  const currentRegion = isClient ? region : DEFAULT_REGION;
  const regionalInfo = getRegionalInfo(product, currentRegion);

  const isRegionAvailable = isProductAvailableForRegion(product, currentRegion);
  const isFulfillmentReady = isProductFulfillmentReady(product, currentRegion);
  const isPurchasable = product.isActive && isRegionAvailable && isFulfillmentReady;
  const availableSizes = product.availableSizes;

  useEffect(() => {
    if (!selectedSize) {
      return;
    }

    if (!availableSizes.includes(selectedSize)) {
      setSelectedSize(null);
    }
  }, [availableSizes, selectedSize]);

  const statusMessage = useMemo(() => {
    if (!product.isActive) {
      return 'Cette pièce est actuellement indisponible.';
    }

    if (!isRegionAvailable) {
      return `Cette pièce n’est pas disponible pour la région ${currentRegion}.`;
    }

    if (!isFulfillmentReady) {
      return 'Cette pièce sera bientôt disponible à la commande.';
    }

    return null;
  }, [currentRegion, isFulfillmentReady, isRegionAvailable, product.isActive]);

  const buttonLabel = useMemo(() => {
    if (!isPurchasable) {
      return 'Bientôt disponible';
    }

    if (!selectedSize) {
      return 'Sélectionner une taille';
    }

    return 'Ajouter au panier';
  }, [isPurchasable, selectedSize]);

  const handleAddToCart = () => {
    if (!isPurchasable) {
      return;
    }

    if (!selectedSize) {
      setFeedbackMessage('Veuillez sélectionner une taille.');
      return;
    }

    addItem(product, selectedSize);
    setFeedbackMessage(`${product.name} — taille ${selectedSize} ajouté au panier.`);
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

      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-[#EAE8E3]/45">
          Région active
        </span>

        <span className="font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[#C5B39B]">
          {currentRegion} · {regionalInfo.currency}
        </span>
      </div>

      <div
        className="mb-8 grid grid-cols-4 gap-3"
        role="radiogroup"
        aria-label="Sélection de la taille"
      >
        {availableSizes.map((size) => {
          const isSelected = selectedSize === size;
          const isDisabled = !isPurchasable;

          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              onClick={() => {
                setSelectedSize(size);
                setFeedbackMessage(null);
              }}
              className={`border py-3 font-sans text-sm outline-none transition-colors ${
                isSelected
                  ? 'border-[#C5B39B] bg-[#C5B39B]/10 text-[#C5B39B]'
                  : 'border-[#EAE8E3]/20 text-[#EAE8E3] hover:border-[#C5B39B] hover:text-[#C5B39B]'
              } ${
                isDisabled ? 'cursor-not-allowed opacity-40 hover:border-[#EAE8E3]/20 hover:text-[#EAE8E3]' : ''
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {statusMessage ? (
        <div className="mb-6 border border-white/10 bg-white/[0.03] px-4 py-4">
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
            État de la commande
          </p>
          <p className="mt-2 font-sans text-sm font-light leading-relaxed text-white/70">
            {statusMessage}
          </p>
        </div>
      ) : null}

      {feedbackMessage ? (
        <div className="mb-6 border border-[#C5B39B]/20 bg-[#C5B39B]/5 px-4 py-4">
          <p className="font-sans text-sm font-light leading-relaxed text-[#EAE8E3]/80">
            {feedbackMessage}
          </p>
        </div>
      ) : null}

      <Button
        variant={isPurchasable ? 'primary' : 'outline'}
        size="lg"
        className="group flex w-full items-center justify-between"
        onClick={handleAddToCart}
        disabled={!isPurchasable}
      >
        <span>{buttonLabel}</span>

        <Icon
          size={18}
          className="transform transition-transform group-hover:translate-x-2"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </Icon>
      </Button>
    </div>
  );
}