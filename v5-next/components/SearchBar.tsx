"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// Client Component: dùng state, event onChange và useRouter của browser.
export function SearchBar() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  return (
    <SearchForm
      initialQuery={urlQuery}
      initialSearchParams={searchParams.toString()}
      key={searchParams.toString()}
    />
  );
}

function SearchForm({
  initialQuery,
  initialSearchParams,
}: {
  initialQuery: string;
  initialSearchParams: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    const params = new URLSearchParams(initialSearchParams);

    if (normalizedQuery) {
      params.set("q", normalizedQuery);
    } else {
      params.delete("q");
    }

    params.delete("page");
    const serializedParams = params.toString();
    const target = serializedParams ? `/?${serializedParams}` : "/";

    router.push(target);
  }

  return (
    <form
      className="order-4 flex min-w-48 flex-1 gap-2 sm:order-none"
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor="search">
        Tìm kiếm sản phẩm
      </label>
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
        id="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        type="search"
        value={query}
      />
      <button
        className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        type="submit"
      >
        Tìm
      </button>
    </form>
  );
}
