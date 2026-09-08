import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.info(`[server] Render chi tiết sản phẩm ${id}`);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        Dynamic route
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
        Sản phẩm #{id}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Segment{" "}
        <code className="rounded bg-slate-200 px-1.5 py-0.5 text-base">
          [id]
        </code>{" "}
        trong thư mục tạo URL động này. Dữ liệu thật sẽ được fetch ở ngày sau.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          href="/cart"
        >
          Thêm vào giỏ (sắp có)
        </Link>
        <Link
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          href="/"
        >
          Quay lại
        </Link>
      </div>
    </section>
  );
}
