import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  isInCart: (id: string) => boolean;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isCheckoutOpen: false,

      addItem: (item: CartItem) => {
        const { items } = get();
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      clearCart: () => {
        set({ items: [], isCheckoutOpen: false });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      openCheckout: () => {
        set({ isOpen: false, isCheckoutOpen: true });
      },

      closeCheckout: () => {
        set({ isCheckoutOpen: false });
      },

      isInCart: (id: string) => {
        return get().items.some((item) => item.id === id);
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
