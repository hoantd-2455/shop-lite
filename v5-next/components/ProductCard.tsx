import { AddToCartButton } from "@/components/AddToCartButton";
import type { Product } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Server Component: chỉ button là Client Component vì nó có onClick và Zustand.
export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock < 1;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        className="relative aspect-4/3 overflow-hidden rounded-lg bg-slate-100"
        href={`/product/${product.id}`}
      >
        <Image
          alt={product.title}
          className="object-cover"
          fill
          sizes="(min-width: 1280px) 270px, (min-width: 640px) 45vw, 100vw"
          src={product.thumbnail}
        />
      </Link>

      <p className="mt-4 text-sm font-semibold capitalize text-blue-600">
        {product.category}
      </p>
      <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900">
        <Link href={`/product/${product.id}`}>{product.title}</Link>
      </h2>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">
        {product.description}
      </p>
      <p className="mt-4 font-bold text-blue-600">
        {formatPrice(product.price)}
      </p>
      <p className="mt-1 text-sm text-slate-500">⭐ {product.rating} / 5</p>
      <AddToCartButton disabled={isOutOfStock} product={product} />
    </article>
  );
}
