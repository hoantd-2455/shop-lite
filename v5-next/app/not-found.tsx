import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold text-slate-900">
        Không tìm thấy trang này
      </h1>
      <Link
        className="mt-6 inline-block font-semibold text-blue-600 hover:text-blue-800"
        href="/"
      >
        ← Về ShopLite
      </Link>
    </section>
  );
}
