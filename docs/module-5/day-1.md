# Ngày 1 — App Router & cấu trúc Next.js

## Lý thuyết cơ bản

Next.js là framework xây trên React. Nó thêm routing, render phía server (SSR/SSG) và các tối ưu sẵn có, biến React SPA thành ứng dụng đầy đủ với SEO và tốc độ tốt hơn.

### App Router

App Router là cách hiện đại, dựa trên thư mục `app/`. Mỗi thư mục là một URL segment.

- `page.tsx`: UI của route, ví dụ `app/cart/page.tsx` tạo route `/cart`.
- `layout.tsx`: khung dùng chung bọc các page con, ví dụ Header/Footer. Layout giữ nguyên khi điều hướng giữa các page con.
- `loading.tsx`, `error.tsx`, `not-found.tsx`: UI tự động cho các trạng thái tương ứng.
- Điều hướng bằng `<Link href="...">` từ `next/link`, có prefetch và không reload toàn bộ trang.

Điểm mấu chốt: code trong Next có thể chạy ở server (lúc build hoặc khi có request) hoặc ở trình duyệt. Hiểu ranh giới này là nền tảng của cả module.

## Lab thực hành

1. Tạo app bằng `npx create-next-app@latest` với TypeScript, App Router, ESLint và Tailwind. Chạy `npm run dev`, sau đó xem cấu trúc thư mục `app/`.
2. Tạo các route bằng thư mục trong `app/`; thử route lồng nhau và một `layout.tsx` riêng cho nhánh đó.
3. Dựng `app/layout.tsx` gốc với Header/Footer bằng Tailwind; dùng `<Link href="...">` để điều hướng.
4. Đặt log trong một `page.tsx` Server Component và một component có `"use client"`; xác định log ở terminal và log ở browser console.

## Đóng góp vào ShopLite

- Tạo `v5-next/` bằng `create-next-app`, bật sẵn Tailwind để chuẩn bị migrate từ React SPA sang Next.js.
- Dựng layout chung với Header (logo, ô tìm kiếm, giỏ hàng và badge) và Footer; dùng `<Link>` để điều hướng.
- Tạo khung các route: `/` (danh sách), `/product/[id]` (chi tiết), `/cart`, `/checkout`, `/login` và `/orders`.

## Tiêu chí hoàn thành

- Hiểu cấu trúc `app/` và điều hướng được giữa các route bằng `<Link>`.
- Phân biệt log chạy ở server và browser, đồng thời giải thích được nguyên nhân.
- Tailwind hoạt động và layout chung xuất hiện trên mọi trang.
