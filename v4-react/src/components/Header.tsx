import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useCartStore } from "../store/cartStore";
import { CartDrawer } from "./CartDrawer";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (nextQuery: string) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function Header({
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <header
      className={
        theme === "dark"
          ? "border-b border-slate-700 bg-slate-900"
          : "border-b border-slate-200 bg-white"
      }
    >
      <div className="mx-auto flex min-h-18 w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
        <a className="text-2xl font-bold text-blue-600" href="#top">
          ShopLite
        </a>

        <SearchBar onValueChange={onSearchChange} value={searchQuery} />

        <button
          className={
            theme === "dark"
              ? "font-medium text-slate-100"
              : "font-medium text-slate-700"
          }
          onClick={() => setIsCartOpen(true)}
          type="button"
        >
          Giỏ hàng {cartTotal > 0 && `· ${formatPrice(cartTotal)}`} {" "}
          <span className="inline-grid size-6 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">
            {cartCount}
          </span>
        </button>
        <button
          aria-label="Đổi giao diện sáng hoặc tối"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          onClick={toggleTheme}
          type="button"
        >
          {theme === "dark" ? "☀️ Sáng" : "🌙 Tối"}
        </button>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
