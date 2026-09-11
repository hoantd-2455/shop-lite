"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
}

export function ProductFilters({
  categories,
  selectedCategory,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.delete("page");
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <label
      className="mt-6 block max-w-64 text-sm font-semibold text-slate-700"
      htmlFor="category"
    >
      Danh mục
      <select
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
        id="category"
        onChange={(event) => handleCategoryChange(event.target.value)}
        value={selectedCategory}
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}
