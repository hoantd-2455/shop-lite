import { CartLink } from "@/components/CartLink";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";
import { Suspense } from "react";

const navigationItems = [
  { href: "/", label: "Sản phẩm" },
  { href: "/orders", label: "Đơn hàng" },
];

// Server Component: Header không cần state; các phần tương tác được tách nhỏ bên dưới.
export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-18 w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
        <Link className="text-2xl font-bold text-blue-600" href="/">
          ShopLite
        </Link>

        <nav
          aria-label="Điều hướng chính"
          className="order-3 flex w-full gap-4 text-sm sm:order-none sm:w-auto"
        >
          {navigationItems.map((item) => (
            <Link
              className="font-semibold text-slate-700 transition hover:text-blue-600"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        <CartLink />
      </div>
    </header>
  );
}

function SearchBarFallback() {
  return (
    <div className="order-4 h-11 min-w-48 flex-1 rounded-lg border border-slate-200 bg-slate-100 sm:order-none" />
  );
}
