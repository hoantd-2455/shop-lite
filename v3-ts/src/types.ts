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

/** Dữ liệu tối thiểu cần lưu ở localStorage cho một item trong giỏ hàng. */
export interface CartItem extends Pick<
  Product,
  "id" | "title" | "price" | "thumbnail"
> {
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
