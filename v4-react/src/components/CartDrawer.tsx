import { useCartStore } from "../store/cartStore";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-slate-950/45" role="presentation">
      <aside
        aria-labelledby="cart-heading"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl"
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold" id="cart-heading">Giỏ hàng</h2>
          <button
            aria-label="Đóng giỏ hàng"
            className="rounded-lg px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100"
            onClick={onClose}
            type="button"
          >
            Đóng
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-center text-slate-600">Giỏ hàng đang trống.</p>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="grid gap-4">
                {items.map((item) => (
                  <li className="flex gap-3" key={item.id}>
                    <img
                      alt={item.title}
                      className="size-16 rounded-lg object-cover"
                      src={item.thumbnail}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm font-bold text-blue-600">
                        {formatPrice(item.price)}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <label className="text-sm text-slate-600" htmlFor={`quantity-${item.id}`}>
                          SL
                          <input
                            className="ml-2 w-16 rounded border border-slate-300 px-2 py-1"
                            id={`quantity-${item.id}`}
                            min="1"
                            onChange={(event) =>
                              updateQuantity(item.id, Number(event.target.value))
                            }
                            type="number"
                            value={item.quantity}
                          />
                        </label>
                        <button
                          className="text-sm font-semibold text-red-600 hover:text-red-800"
                          onClick={() => removeFromCart(item.id)}
                          type="button"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="text-blue-600">{formatPrice(total)}</span>
              </div>
              <button
                className="mt-4 w-full rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-700 transition hover:bg-red-50"
                onClick={clearCart}
                type="button"
              >
                Xóa toàn bộ giỏ hàng
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
