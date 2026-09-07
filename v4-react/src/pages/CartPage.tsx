import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Giỏ hàng</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Sản phẩm bạn đã chọn</h1>

      {items.length === 0 ? (
        <section className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-600">Giỏ hàng đang trống.</p>
          <Link className="mt-4 inline-block font-semibold text-blue-600" to="/">
            ← Khám phá sản phẩm
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
          <ul className="grid gap-4">
            {items.map((item) => (
              <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={item.id}>
                <img alt={item.title} className="size-20 rounded-lg object-cover" src={item.thumbnail} />
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="mt-1 font-semibold text-blue-600">{formatPrice(item.price)}</p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <label className="text-sm text-slate-600" htmlFor={`quantity-${item.id}`}>
                      Số lượng
                      <input
                        className="ml-2 w-16 rounded border border-slate-300 px-2 py-1 text-slate-800"
                        id={`quantity-${item.id}`}
                        min="1"
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        type="number"
                        value={item.quantity}
                      />
                    </label>
                    <button className="text-sm font-semibold text-red-600 hover:text-red-800" onClick={() => removeFromCart(item.id)} type="button">
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 text-lg font-bold">
              <span>Tổng cộng</span>
              <span className="text-blue-600">{formatPrice(total)}</span>
            </div>
            <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700" onClick={() => window.alert("Chức năng thanh toán sẽ được triển khai ở module Next.")} type="button">
              Thanh toán
            </button>
            <button className="mt-3 w-full rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-700 transition hover:bg-red-50" onClick={clearCart} type="button">
              Xóa toàn bộ giỏ hàng
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
