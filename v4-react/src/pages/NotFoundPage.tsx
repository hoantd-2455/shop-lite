import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-bold">Không tìm thấy trang này</h1>
      <Link className="mt-5 inline-block font-semibold text-blue-600" to="/">
        ← Về trang sản phẩm
      </Link>
    </div>
  );
}
