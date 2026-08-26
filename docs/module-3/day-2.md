# Day 2 — Generics, Async và refactor ShopLite

## Mục tiêu trong ngày

- Dùng generic để tái sử dụng code mà vẫn type-safe.
- Type hóa API bất đồng bộ và dữ liệu chưa xác định.
- Bật `strict` và xử lý giá trị có thể là `null` hoặc `undefined`.
- Chuyển toàn bộ logic ShopLite từ JavaScript sang TypeScript.

## Kiến thức trọng tâm

### Generics

Generic cho phép một hàm hoặc type hoạt động với nhiều kiểu mà không phải dùng `any`.

```ts
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}
```

`getFirst(products)` trả về `Product | undefined`, còn `getFirst([1, 2])` trả về `number | undefined`. Đây là cùng ý tưởng với generics trong Java hoặc C#.

Generics xuất hiện thường xuyên trong `Array<Product>`, `Promise<Product[]>` và `FetchState<Product[]>`.

### Type cho async và fetch

Một hàm `async` luôn trả về `Promise<T>`.

```ts
async function getProducts(): Promise<Product[]> {
  // ...
}
```

Dữ liệu từ API không đáng tin ngay lập tức. Đặt dữ liệu đó thành `unknown`, sau đó dùng type guard để kiểm tra cấu trúc trước khi coi nó là `Product` hoặc `Product[]`.

### `unknown` và `any`

- `any`: tắt kiểm tra type; dễ tạo lỗi runtime.
- `unknown`: buộc code phải kiểm tra type trước khi dùng.

Với API response và `JSON.parse()`, ưu tiên `unknown` rồi narrowing thay vì ép kiểu bừa.

### Chế độ `strict`

`"strict": true` giúp TypeScript kiểm tra chặt hơn, gồm cả các trường hợp `null` và `undefined`. Đây là thiết lập nên bật cho code production.

## Lab

1. Viết `identity<T>(value: T): T` và `getFirst<T>(items: T[]): T | undefined`.
2. Viết generic helper `getJSON<T>()` nhận type guard và trả về `Promise<T>`.
3. Kiểm tra API response bằng type guard thay vì `any`.
4. Kiểm tra dữ liệu `localStorage` sau `JSON.parse()` trước khi dùng.
5. Dùng generic `querySelector<T>()` và kiểm tra phần tử DOM bắt buộc tồn tại.

## Áp dụng vào ShopLite

- `src/api.ts`: `getProducts(): Promise<Product[]>` và `getProductById(): Promise<Product>`.
- `src/cart.ts`: mọi hàm giỏ hàng nhận/trả `CartItem[]` rõ ràng.
- `src/main.ts`, `src/product.ts`, `src/cart-page.ts`: type hóa DOM event, phần tử DOM và dữ liệu hiển thị.
- `src/dom.ts`: helper lấy phần tử DOM, tránh bỏ sót trường hợp `null`.
- `vite.config.ts`: build đủ ba trang `index.html`, `product.html` và `cart.html`.

## Hoàn thành khi

- `npm run build` hoặc `tsc --noEmit` không có lỗi với `strict: true`.
- Không dùng `any` cho dữ liệu sản phẩm, API hoặc giỏ hàng.
- ShopLite vẫn có danh sách sản phẩm, tìm kiếm, chi tiết, giỏ hàng và lưu dữ liệu qua reload.
- Commit phần thay đổi và tạo tag `v3-ts` sau khi hoàn thành Module 3.
