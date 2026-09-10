"use client";

import { useEffect } from "react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Không thể tải trang chi tiết sản phẩm:", error);
  }, [error]);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-950">
        <h1 className="text-xl font-bold">Chưa thể tải sản phẩm</h1>
        <p className="mt-2 text-red-800">
          Có lỗi khi lấy dữ liệu. Hãy thử lại sau ít giây.
        </p>
        <button
          className="mt-5 rounded-lg bg-red-700 px-4 py-2.5 font-semibold text-white transition hover:bg-red-800"
          onClick={reset}
          type="button"
        >
          Thử lại
        </button>
      </div>
    </section>
  );
}
