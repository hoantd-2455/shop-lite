interface SearchBarProps {
  value: string;
  onValueChange: (nextValue: string) => void;
}

export function SearchBar({ value, onValueChange }: SearchBarProps) {
  return (
    <label className="min-w-48 flex-1" htmlFor="search">
      <span className="sr-only">Tìm kiếm sản phẩm</span>
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
        id="search"
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        type="search"
        value={value}
      />
    </label>
  );
}
