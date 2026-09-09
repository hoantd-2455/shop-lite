"use client";

import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  disabled: boolean;
  product: Product;
}

// Client Component: onClick gọi Zustand nên cần "use client".
export function AddToCartButton({ disabled, product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      disabled={disabled}
      onClick={() => addToCart(product)}
      type="button"
    >
      {disabled ? "Tạm hết hàng" : "Thêm vào giỏ"}
    </button>
  );
}
