import { useMemo, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ProductList } from "../components/ProductList";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products = [], error, isError, isFetching, isPending, refetch } = useProducts();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery),
    );
  }, [products, searchQuery]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        React · Day 5
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Sản phẩm mới nhất
      </h1>
      <div className="mt-6 max-w-xl">
        <SearchBar onValueChange={setSearchQuery} value={searchQuery} />
      </div>

      {isPending ? (
        <ProductListSkeleton />
      ) : isError ? (
        <section className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
          <h2 className="font-bold">Không thể tải sản phẩm</h2>
          <p className="mt-1 text-sm">{error.message}</p>
          <button
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition hover:bg-red-800"
            onClick={() => refetch()}
            type="button"
          >
            Thử lại
          </button>
        </section>
      ) : (
        <>
          {isFetching && (
            <p className="mt-5 text-sm text-slate-500">Đang đồng bộ dữ liệu...</p>
          )}
          <ProductList products={filteredProducts} />
        </>
      )}

      <section className="mt-16 border-t border-slate-200 pt-10" id="login">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            React Hook Form + Zod
          </p>
          <h2 className="mt-2 text-2xl font-bold">Đăng nhập thử</h2>
          <p className="mt-2 text-slate-600">
            Form này được validate bằng schema, chưa gửi dữ liệu tới server.
          </p>
          <LoginForm />
        </div>
      </section>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
          key={index}
        >
          <div className="aspect-4/3 rounded-lg bg-slate-200" />
          <div className="mt-4 h-4 w-2/5 rounded bg-slate-200" />
          <div className="mt-3 h-5 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-200" />
          <div className="mt-5 h-10 rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
