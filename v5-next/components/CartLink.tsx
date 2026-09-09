"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

// Client Component: badge đọc client state từ Zustand.
export function CartLink() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <Link
      className="font-semibold text-slate-700 transition hover:text-blue-600"
      href="/cart"
    >
      Giỏ hàng{" "}
      <span className="inline-grid size-6 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">
        {itemCount}
      </span>
    </Link>
  );
}
