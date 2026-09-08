# Module 5 — Next.js

Module này tập trung vào App Router, ranh giới Server Component và Client Component, cùng các kiểu data fetching như SSR/SSG. Câu hỏi quan trọng nhất là: **code này chạy ở server hay trình duyệt?** Chỉ nên bắt đầu khi React đã vững.

ShopLite sẽ được hoàn thiện bằng cách migrate sang Next App Router, render phía server cho SEO, thêm form thanh toán có validation và deploy thật lên Vercel.

## Mục tiêu cuối module

- Hiểu kiến trúc App Router: file-based routing, layout, loading và error UI.
- Phân biệt Server Component (mặc định) với Client Component (`"use client"`).
- Fetch dữ liệu ở server; hiểu SSR, SSG và caching.
- Tạo Route Handler (API) và dùng dynamic route.
- Làm form với React Hook Form + Zod, metadata cho SEO.
- Phân loại state trong Next: server, URL (`searchParams`) và client; tích hợp Zustand, Redux Toolkit hoặc TanStack Query với App Router.
- Làm authentication và authorization với Auth.js: đăng nhập, session/JWT và bảo vệ route bằng middleware.
- Tối ưu Core Web Vitals và SEO bằng Metadata API.
- Deploy lên Vercel với URL public.
