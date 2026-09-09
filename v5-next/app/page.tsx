import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

// Server Component: không có "use client", nên fetch và render list chạy ở server.
export default async function Home({ searchParams }: HomePageProps) {
  const { q = "" } = await searchParams;
  const products = await getProducts();
  const normalizedQuery = q.trim().toLocaleLowerCase("vi-VN");
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLocaleLowerCase("vi-VN").includes(normalizedQuery) ||
      product.category.toLocaleLowerCase("vi-VN").includes(normalizedQuery),
  );

  console.info(
    `[server] Render trang chủ với ${filteredProducts.length} sản phẩm`,
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        Next.js · Day 2
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Sản phẩm mới nhất
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Dữ liệu được fetch và render phía server từ DummyJSON, sau đó cache tối
        đa 60 giây.
      </p>

      {normalizedQuery && (
        <p className="mt-6 text-sm font-medium text-slate-600">
          {filteredProducts.length} kết quả cho “{q.trim()}”
        </p>
      )}

      <ProductGrid products={filteredProducts} />
    </section>
  );
}
