import Link from "next/link";

export default function Home() {
  console.info("[server] Render trang chủ ShopLite");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
        Next.js · Day 1
      </p>
      <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        ShopLite đã chuyển sang Next.js App Router
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Trang này là Server Component mặc định. Hãy xem terminal để thấy log
        render của server, rồi mở DevTools để thấy log hydrate của Header.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          href="/product/1"
        >
          Xem sản phẩm mẫu
        </Link>
        <Link
          className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          href="/cart"
        >
          Mở giỏ hàng
        </Link>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <RouteCard
          description="Route gốc"
          href="/"
          title="Danh sách sản phẩm"
        />
        <RouteCard
          description="Dynamic route"
          href="/product/1"
          title="Chi tiết sản phẩm"
        />
        <RouteCard
          description="Route độc lập"
          href="/checkout"
          title="Thanh toán"
        />
      </div>
    </section>
  );
}

function RouteCard({
  description,
  href,
  title,
}: {
  description: string;
  href: string;
  title: string;
}) {
  return (
    <Link
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
      href={href}
    >
      <p className="text-sm font-semibold text-blue-600">{description}</p>
      <h2 className="mt-2 text-xl font-bold text-slate-900">{title}</h2>
    </Link>
  );
}
