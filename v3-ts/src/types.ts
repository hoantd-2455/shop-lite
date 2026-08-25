/** Dữ liệu sản phẩm trả về từ API DummyJSON. */
export interface Product {
  readonly id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
}

/** Một sản phẩm khi đã nằm trong giỏ hàng sẽ có thêm số lượng. */
export interface CartItem extends Product {
  quantity: number;
}

/** Chỉ chấp nhận hai cách sắp xếp này. */
export type SortDir = "asc" | "desc";

export type FetchStatus = "idle" | "loading" | "error" | "success";

/**
 * T là kiểu dữ liệu sẽ nhận được nếu request thành công.
 * Ví dụ: FetchState<Product[]> nghĩa là state của danh sách sản phẩm.
 */
export type FetchState<T> = {
  status: FetchStatus;
  data?: T;
  error?: string;
};
