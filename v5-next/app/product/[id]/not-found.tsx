import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="text-3xl font-bold text-slate-900">
        Không tìm thấy sản phẩm
      </h1>
      <p className="mt-3 text-slate-600">
        Sản phẩm có thể không tồn tại hoặc đã bị xoá.
      </p>
      <Link
        className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        href="/"
      >
        Về trang sản phẩm
      </Link>
    </section>
  );
}
