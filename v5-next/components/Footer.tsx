import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6">
        <p>© 2026 ShopLite · Next.js App Router</p>
        <div className="flex gap-4">
          <Link className="hover:text-blue-600" href="/login">
            Đăng nhập
          </Link>
          <Link className="hover:text-blue-600" href="/checkout">
            Thanh toán
          </Link>
        </div>
      </div>
    </footer>
  );
}
