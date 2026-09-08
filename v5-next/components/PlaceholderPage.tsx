import Link from "next/link";

interface PlaceholderPageProps {
  description: string;
  title: string;
}

export function PlaceholderPage({ description, title }: PlaceholderPageProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        ShopLite
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        {description}
      </p>
      <Link
        className="mt-8 inline-block font-semibold text-blue-600 hover:text-blue-800"
        href="/"
      >
        ← Về trang sản phẩm
      </Link>
    </section>
  );
}
