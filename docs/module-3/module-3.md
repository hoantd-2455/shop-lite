# Module 3 — TypeScript

Module này tập trung vào hệ thống type của TypeScript. Với nền tảng Java hoặc các ngôn ngữ kiểu tĩnh, nhiều khái niệm sẽ quen thuộc; phần cần chú ý nhất là union type, sự khác biệt giữa `interface` và `type`, generics và type inference.

## Mục tiêu

- Dùng được kiểu cơ bản, `interface`, `type`, union, optional property và `readonly`.
- Type hóa object, mảng, hàm và kết quả `fetch`.
- Hiểu generics, `unknown` so với `any`, và kiểm tra type bằng narrowing.
- Thiết lập dự án TypeScript với Vite và đọc lỗi compiler.
- Chuyển ShopLite từ JavaScript sang TypeScript mà không thay đổi chức năng.

## Phạm vi

Chưa cần học hết utility type nâng cao ở giai đoạn này. Các type như `Partial`, `Omit` hay `Record` sẽ được gặp lại tự nhiên khi vào React.

## Kết quả mong đợi

Thư mục `v3-ts/` là phiên bản TypeScript của ShopLite, chạy bằng Vite và có type rõ ràng cho sản phẩm, API, DOM và giỏ hàng.
