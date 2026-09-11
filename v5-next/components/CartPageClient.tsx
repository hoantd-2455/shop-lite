"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("vi-VN");

export function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <h1 className="text-3xl font-bold text-slate-900">Giỏ hàng trống</h1>
        <p className="mt-3 text-slate-600">
          Hãy chọn một sản phẩm để bắt đầu mua sắm.
        </p>
        <Link
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          href="/"
        >
          Xem sản phẩm
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Client state · Zustand
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Giỏ hàng</h1>
        </div>
        <button
          className="text-sm font-semibold text-red-700 transition hover:text-red-900"
          onClick={clearCart}
          type="button"
        >
          Xóa toàn bộ
        </button>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
          {items.map((item) => (
            <li className="flex gap-4 py-5" key={item.id}>
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <Image
                  alt={item.title}
                  className="object-cover"
                  fill
                  sizes="80px"
                  src={item.thumbnail}
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  className="font-bold text-slate-900 hover:text-blue-700"
                  href={`/product/${item.id}`}
                >
                  {item.title}
                </Link>
                <p className="mt-1 font-semibold text-blue-700">
                  {currencyFormatter.format(item.price)} ₫
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex overflow-hidden rounded-lg border border-slate-300">
                    <button
                      aria-label={`Giảm số lượng ${item.title}`}
                      className="px-3 py-1.5 font-bold hover:bg-slate-100"
                      onClick={() => decreaseQuantity(item.id)}
                      type="button"
                    >
                      −
                    </button>
                    <span className="min-w-10 border-x border-slate-300 px-3 py-1.5 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      aria-label={`Tăng số lượng ${item.title}`}
                      className="px-3 py-1.5 font-bold hover:bg-slate-100"
                      onClick={() => increaseQuantity(item.id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-sm font-semibold text-red-700 hover:text-red-900"
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <p className="shrink-0 font-bold text-slate-900">
                {currencyFormatter.format(item.price * item.quantity)} ₫
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Tạm tính</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {currencyFormatter.format(total)} ₫
          </p>
          <Link
            className="mt-6 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            href="/checkout"
          >
            Tiến hành thanh toán
          </Link>
        </aside>
      </div>
    </section>
  );
}
