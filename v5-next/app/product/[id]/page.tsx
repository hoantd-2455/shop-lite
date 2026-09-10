import { AddToCartButton } from "@/components/AddToCartButton";
import { getProduct, getProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Các id này được render sẵn khi build. Id khác vẫn có thể render khi truy cập.
export async function generateStaticParams() {
  const products = await getProducts();

  return products.slice(0, 4).map((product) => ({
    id: String(product.id),
  }));
}

// Server Component: đọc params và fetch dữ liệu trước khi gửi HTML về trình duyệt.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isSafeInteger(productId) || productId < 1) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Link
        className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        href="/"
      >
        ← Quay lại danh sách sản phẩm
      </Link>

      <article className="mt-6 grid gap-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
          <Image
            alt={product.title}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            src={product.thumbnail}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-5 leading-7 text-slate-600">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm">
            <div>
              <dt className="text-slate-500">Đánh giá</dt>
              <dd className="mt-1 font-bold text-slate-900">
                {product.rating} / 5
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Kho còn lại</dt>
              <dd className="mt-1 font-bold text-slate-900">{product.stock}</dd>
            </div>
          </dl>

          <p className="mt-7 text-3xl font-bold text-blue-700">
            {product.price.toLocaleString("vi-VN")} ₫
          </p>
          <AddToCartButton disabled={product.stock === 0} product={product} />
        </div>
      </article>
    </section>
  );
}
