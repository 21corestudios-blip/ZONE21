import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product, Region } from '@/data/products.data';

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

const DEFAULT_REGION: Region = 'EU';
const REGION_COOKIE_NAME = 'user-region';
const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

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
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.size === size,
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + 1,
            };

            return { items: newItems };
          }

          return {
            items: [...state.items, { product, size, quantity: 1 }],
          };
        });
      },

      removeItem: (productId: string, size: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === size),
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
          const regionalProductData = item.product.regions[region];

          if (!regionalProductData) {
            return total;
          }

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