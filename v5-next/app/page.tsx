import { ProductFilters } from "@/components/ProductFilters";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import Link from "next/link";

interface HomePageProps {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}

// Server Component: không có "use client", nên fetch và render list chạy ở server.
export default async function Home({ searchParams }: HomePageProps) {
  const { category = "", page = "1", q = "" } = await searchParams;
  const products = await getProducts();
  const normalizedQuery = q.trim().toLocaleLowerCase("vi-VN");
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  ).sort();
  const selectedCategory = categories.includes(category) ? category : "";
  const filteredProducts = products.filter(
    (product) =>
      (product.title.toLocaleLowerCase("vi-VN").includes(normalizedQuery) ||
        product.category
          .toLocaleLowerCase("vi-VN")
          .includes(normalizedQuery)) &&
      (!selectedCategory || product.category === selectedCategory),
  );
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const requestedPage = Number(page);
  const currentPage = Number.isSafeInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  console.info(
    `[server] Render trang chủ với ${filteredProducts.length} sản phẩm`,
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        Next.js · Day 4
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Sản phẩm mới nhất
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Từ khóa, danh mục và trang đều nằm trên URL: bạn có thể refresh, bấm
        back/forward hoặc gửi link cho người khác mà vẫn giữ đúng bộ lọc.
      </p>

      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
      />

      {(normalizedQuery || selectedCategory) && (
        <p className="mt-6 text-sm font-medium text-slate-600">
          {filteredProducts.length} kết quả
          {normalizedQuery ? ` cho “${q.trim()}”` : ""}
          {selectedCategory ? ` trong ${selectedCategory}` : ""}
        </p>
      )}

      <ProductGrid products={paginatedProducts} />

      {totalPages > 1 && (
        <nav aria-label="Phân trang" className="mt-8 flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => {
              const params = new URLSearchParams();

              if (q.trim()) params.set("q", q.trim());
              if (selectedCategory) params.set("category", selectedCategory);
              if (pageNumber > 1) params.set("page", String(pageNumber));
              const href = params.size ? `/?${params.toString()}` : "/";

              return (
                <Link
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    pageNumber === currentPage
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                  href={href}
                  key={pageNumber}
                >
                  {pageNumber}
                </Link>
              );
            },
          )}
        </nav>
      )}
    </section>
  );
}
