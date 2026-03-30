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
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      region: 'EU', // Valeur initiale, sera mise à jour par l'hydratation

      setRegion: (newRegion: Region) => {
        // On met à jour le cookie pour le middleware
        document.cookie = `user-region=${newRegion}; path=/; max-age=${60 * 60 * 24 * 30}`;
        set({ region: newRegion });
      },

      addItem: (product, size) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.size === size
          );
          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
            return { items: newItems };
          }
          return { items: [...state.items, { product, size, quantity: 1 }] };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === size)
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
          // On va chercher le prix spécifique à la région actuelle
          const price = item.product.regions[region].price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'zone21-cart-storage',
    }
  )
);