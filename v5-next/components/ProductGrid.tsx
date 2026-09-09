import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
}

// Server Component: chỉ ghép UI, không mang JavaScript tương tác xuống browser.
export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Không tìm thấy sản phẩm phù hợp.
      </p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
