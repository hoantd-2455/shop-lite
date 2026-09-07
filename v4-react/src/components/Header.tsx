import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useCartStore } from "../store/cartStore";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function Header() {
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
        <Link className="text-2xl font-bold text-blue-600" to="/">
          ShopLite
        </Link>

        <nav aria-label="Điều hướng chính" className="ml-auto flex items-center gap-4">
          <NavLink className={({ isActive }) => isActive ? "font-semibold text-blue-600" : theme === "dark" ? "font-medium text-slate-100" : "font-medium text-slate-700"} to="/">Sản phẩm</NavLink>
          <NavLink className={({ isActive }) => isActive ? "font-semibold text-blue-600" : theme === "dark" ? "font-medium text-slate-100" : "font-medium text-slate-700"} to="/cart">
            Giỏ hàng {cartTotal > 0 && `· ${formatPrice(cartTotal)}`} {" "}
            <span className="inline-grid size-6 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">{cartCount}</span>
          </NavLink>
        </nav>
        <button
          aria-label="Đổi giao diện sáng hoặc tối"
          className={
            theme === "dark"
              ? "rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              : "rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          }
          onClick={toggleTheme}
          type="button"
        >
          {theme === "dark" ? "☀️ Sáng" : "🌙 Tối"}
        </button>
      </div>
    </header>
  );
}
