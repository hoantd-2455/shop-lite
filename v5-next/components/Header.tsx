"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navigationItems = [
  { href: "/", label: "Sản phẩm" },
  { href: "/orders", label: "Đơn hàng" },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.info("[browser] Header đã hydrate ở trình duyệt");
  }, []);

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

        <label
          className="order-4 min-w-48 flex-1 sm:order-none"
          htmlFor="search"
        >
          <span className="sr-only">Tìm kiếm sản phẩm</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            id="search"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            type="search"
            value={searchQuery}
          />
        </label>

        <Link
          className="font-semibold text-slate-700 transition hover:text-blue-600"
          href="/cart"
        >
          Giỏ hàng{" "}
          <span className="inline-grid size-6 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">
            0
          </span>
        </Link>
      </div>
    </header>
  );
}
