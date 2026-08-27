interface HeaderProps {
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-18 w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
        <a className="text-2xl font-bold text-blue-600" href="#top">
          ShopLite
        </a>

        <label className="min-w-48 flex-1" htmlFor="search">
          <span className="sr-only">Tìm kiếm sản phẩm</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            id="search"
            placeholder="Tìm kiếm sản phẩm..."
            type="search"
          />
        </label>

        <a className="font-medium text-slate-700" href="#cart">
          Giỏ hàng{" "}
          <span className="inline-grid size-6 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">
            {cartCount}
          </span>
        </a>
      </div>
    </header>
  );
}
