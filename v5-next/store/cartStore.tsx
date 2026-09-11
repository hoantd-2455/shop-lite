"use client";

import type { Product } from "@/lib/products";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand/vanilla";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  decreaseQuantity: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

export function createCartStore(initialItems: CartItem[] = []) {
  return createStore<CartState>()((set) => ({
    items: initialItems,
    addToCart: (product) =>
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        }

        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
    clearCart: () => set({ items: [] }),
    decreaseQuantity: (productId) =>
      set((state) => ({
        items: state.items
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      })),
    increaseQuantity: (productId) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      })),
    removeFromCart: (productId) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),
  }));
}

const CartStoreContext = createContext<StoreApi<CartState> | null>(null);

// Tạo store một lần cho mỗi cây Provider ở client, không dùng singleton server.
export function CartStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createCartStore());

  return (
    <CartStoreContext.Provider value={store}>
      {children}
    </CartStoreContext.Provider>
  );
}

export function useCartStore<T>(selector: (state: CartState) => T) {
  const store = useContext(CartStoreContext);

  if (store === null) {
    throw new Error("useCartStore phải được dùng bên trong CartStoreProvider.");
  }

  return useStore(store, selector);
}
