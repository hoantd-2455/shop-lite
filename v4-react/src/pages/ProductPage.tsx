import { Link, useParams } from "react-router-dom";
import { ProductDetail } from "../components/ProductDetail";

export default function ProductPage() {
  const { id } = useParams();
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId < 1) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-2xl font-bold">Sản phẩm không hợp lệ</h1>
        <Link className="mt-4 inline-block font-semibold text-blue-600" to="/">
          ← Về danh sách sản phẩm
        </Link>
      </div>
    );
  }

  return <ProductDetail productId={productId} />;
}
