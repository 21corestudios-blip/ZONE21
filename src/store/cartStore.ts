import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  DEFAULT_REGION,
  type Product,
  type Region,
  getRegionalInfo,
  isProductAvailableForRegion,
  isProductFulfillmentReady,
  isSupportedProductSize,
  normalizeProductSize,
} from '@/data/products.data';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  region: Region;
  setRegion: (region: Region) => void;
  hydrateRegionFromCookie: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const REGION_COOKIE_NAME = 'user-region';
const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const MAX_QUANTITY_PER_LINE = 10;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function isValidRegion(value: string): value is Region {
  return value === 'EU' || value === 'US';
}

function getRegionFromCookie(): Region | null {
  if (!isBrowser()) {
    return null;
  }

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();

    if (!trimmedCookie.startsWith(`${REGION_COOKIE_NAME}=`)) {
      continue;
    }

    const value = trimmedCookie.substring(`${REGION_COOKIE_NAME}=`.length);

    if (isValidRegion(value)) {
      return value;
    }
  }

  return null;
}

function setRegionCookie(region: Region): void {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${REGION_COOKIE_NAME}=${region}; path=/; max-age=${REGION_COOKIE_MAX_AGE}`;
}

function canAddProductToCart(product: Product, size: string, region: Region): boolean {
  if (!product.isActive) {
    return false;
  }

  if (!isProductAvailableForRegion(product, region)) {
    return false;
  }

  if (!isProductFulfillmentReady(product, region)) {
    return false;
  }

  return isSupportedProductSize(product, size);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      region: DEFAULT_REGION,

      setRegion: (newRegion: Region) => {
        setRegionCookie(newRegion);
        set({ region: newRegion });
      },

      hydrateRegionFromCookie: () => {
        const cookieRegion = getRegionFromCookie();

        if (cookieRegion && cookieRegion !== get().region) {
          set({ region: cookieRegion });
        }
      },

      addItem: (product: Product, size: string) => {
        const region = get().region;
        const normalizedSize = normalizeProductSize(size);

        if (!normalizedSize) {
          return;
        }

        if (!canAddProductToCart(product, normalizedSize, region)) {
          return;
        }

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.size === normalizedSize,
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            const nextQuantity = Math.min(
              newItems[existingItemIndex].quantity + 1,
              MAX_QUANTITY_PER_LINE,
            );

            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: nextQuantity,
            };

            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                size: normalizedSize,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: (productId: string, size: string) => {
        const normalizedSize = normalizeProductSize(size);

        if (!normalizedSize) {
          return;
        }

        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === normalizedSize),
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items, region } = get();

        return items.reduce((total, item) => {
          if (!isProductAvailableForRegion(item.product, region)) {
            return total;
          }

          const regionalProductData = getRegionalInfo(item.product, region);

          return total + regionalProductData.price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'zone21-cart-storage',
      partialize: (state) => ({
        items: state.items,
        region: state.region,
      }),
    },
  ),
);