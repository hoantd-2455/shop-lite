import { SearchBar } from "./SearchBar";

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (nextQuery: string) => void;
}

export function Header({
  cartCount,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-18 w-full max-w-6xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6">
        <a className="text-2xl font-bold text-blue-600" href="#top">
          ShopLite
        </a>

        <SearchBar onValueChange={onSearchChange} value={searchQuery} />

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
