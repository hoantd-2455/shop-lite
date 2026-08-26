# Day 1 — Nền tảng TypeScript và thiết lập Vite

## Mục tiêu trong ngày

- Hiểu TypeScript kiểm tra code như thế nào.
- Phân biệt `interface`, `type`, union, optional property và `readonly`.
- Tạo project Vite với template Vanilla TypeScript.
- Định nghĩa các type nền cho ShopLite.

## Kiến thức trọng tâm

### TypeScript là gì?

TypeScript là JavaScript có thêm hệ thống type tĩnh. TypeScript kiểm tra code khi phát triển, sau đó transpile sang JavaScript để trình duyệt chạy. Type không tồn tại ở runtime; chúng giúp bắt lỗi và gợi ý code lúc viết.

### Kiểu cơ bản và type inference

- Kiểu cơ bản: `string`, `number`, `boolean`, `null`, `undefined`.
- Mảng: `number[]` hoặc `Array<number>`.
- Tuple: `[string, number]`.
- `any` tắt kiểm tra type, vì vậy nên tránh dùng.

TypeScript có thể tự suy kiểu khi biến được gán giá trị ngay. Chỉ nên ghi type rõ cho tham số hàm, giá trị trả về và biến chưa thể suy ra kiểu.

### `interface` và `type`

Hai công cụ đều mô tả hình dạng dữ liệu.

```ts
interface Product {
  id: number;
  title: string;
}

type SortDir = "asc" | "desc";
```

- Dùng `interface` chủ yếu cho object và khi cần `extends`.
- Dùng `type` cho union, intersection và alias của kiểu nguyên thủy.

### Optional, readonly và union

```ts
interface User {
  readonly id: number;
  email?: string;
}

type Status = "idle" | "loading" | "error";
```

- `email?: string`: thuộc tính có thể không tồn tại.
- `readonly id`: không được gán lại sau khi tạo object.
- Union giới hạn giá trị hợp lệ; `if` hoặc `switch` giúp TypeScript narrowing trong từng nhánh.

## Lab

1. Tạo Vite template `vanilla-ts`, cài dependencies và chạy `npm run dev`.
2. Khai báo biến, mảng, tuple; cố tình gán sai kiểu để quan sát lỗi compiler.
3. Tạo `interface Product`, thử optional property và `readonly`.
4. Viết `type Status` rồi dùng `switch` để xử lý từng trạng thái.
5. Type hóa tham số, giá trị trả về và callback của một hàm.

## Áp dụng vào ShopLite

- Tạo `v3-ts/` bằng Vite Vanilla TypeScript.
- Tạo `src/types.ts` với `Product`, `CartItem`, `SortDir` và `FetchState<T>`.
- `CartItem` chỉ lưu các trường cần cho localStorage (`id`, `title`, `price`, `thumbnail`, `quantity`), nên được tạo từ `Pick<Product, ...>`.
- Dựng UI ShopLite để làm nền cho phần refactor logic ở Day 2.

## Hoàn thành khi

- `npm run dev` chạy được project Vite TypeScript.
- Các type trong `src/types.ts` được import vào file khác.
- Bạn hiểu lỗi như `Type 'string' is not assignable to type 'number'` và biết cách sửa.
