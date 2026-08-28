import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
        Không tìm thấy sản phẩm phù hợp.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          onAddToCart={onAddToCart}
          product={product}
        />
      ))}
    </div>
  );
}
