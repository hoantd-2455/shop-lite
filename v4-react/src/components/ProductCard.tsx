import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        alt={product.title}
        className="aspect-4/3 w-full rounded-lg object-cover"
        src={product.thumbnail}
      />

      <div className="mt-4 flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-blue-600">{product.category}</p>
        {isOutOfStock ? (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
            Hết hàng
          </span>
        ) : (
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
            Còn {product.stock}
          </span>
        )}
      </div>

      <h2 className="mt-2 text-lg font-bold leading-snug">{product.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {product.description}
      </p>
      <p className="mt-4 font-bold text-blue-600">{formatPrice(product.price)}</p>
      <p className="mt-1 text-sm text-slate-500">⭐ {product.rating} / 5</p>

      <button
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isOutOfStock}
        type="button"
      >
        {isOutOfStock ? "Tạm hết hàng" : "Thêm vào giỏ"}
      </button>
    </article>
  );
}
