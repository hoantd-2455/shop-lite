import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useCartStore } from "../store/cartStore";

interface ProductDetailProps {
  productId: number;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductDetail({
  productId,
  onClose,
}: ProductDetailProps) {
  const { data: product, error, isError, isPending, refetch } = useProduct(productId);
  const addToCart = useCartStore((state) => state.addToCart);
  const productTitle = product?.title;

  useEffect(() => {
    if (!productTitle) {
      return;
    }

    const previousTitle = document.title;
    document.title = `ShopLite | ${productTitle}`;

    return () => {
      document.title = previousTitle;
    };
  }, [productTitle]);

  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-slate-950/45 p-4" role="presentation">
      <section
        aria-labelledby="product-detail-heading"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
        role="dialog"
      >
        <div className="flex justify-end">
          <button
            aria-label="Đóng chi tiết sản phẩm"
            className="rounded-lg px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100"
            onClick={onClose}
            type="button"
          >
            Đóng
          </button>
        </div>

        {isPending ? (
          <div className="animate-pulse">
            <div className="aspect-video rounded-xl bg-slate-200" />
            <div className="mt-6 h-7 w-3/4 rounded bg-slate-200" />
            <div className="mt-3 h-4 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
          </div>
        ) : isError ? (
          <div className="rounded-xl bg-red-50 p-5 text-red-800">
            <h2 className="font-bold">Không thể tải chi tiết sản phẩm</h2>
            <p className="mt-1 text-sm">{error.message}</p>
            <button
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white"
              onClick={() => refetch()}
              type="button"
            >
              Thử lại
            </button>
          </div>
        ) : product ? (
          <div className="grid gap-6 md:grid-cols-2">
            <img
              alt={product.title}
              className="aspect-square w-full rounded-xl object-cover"
              src={product.thumbnail}
            />
            <div>
              <p className="text-sm font-semibold text-blue-600">{product.category}</p>
              <h2 className="mt-2 text-2xl font-bold" id="product-detail-heading">
                {product.title}
              </h2>
              <p className="mt-3 text-2xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </p>
              <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-slate-100 p-3">
                  <dt className="text-slate-500">Đánh giá</dt>
                  <dd className="mt-1 font-bold">⭐ {product.rating} / 5</dd>
                </div>
                <div className="rounded-lg bg-slate-100 p-3">
                  <dt className="text-slate-500">Tồn kho</dt>
                  <dd className="mt-1 font-bold">{product.stock} sản phẩm</dd>
                </div>
              </dl>
              <button
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
                type="button"
              >
                {product.stock === 0 ? "Tạm hết hàng" : "Thêm vào giỏ"}
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
