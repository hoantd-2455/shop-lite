# Ngày 2 — Server vs Client Components & Data Fetching

## Lý thuyết cơ bản

### Server Component

Mọi component trong `app/` mặc định chạy ở server. Lợi ích:

- Giữ API key hoặc secret ở server.
- Gửi ít JavaScript hơn xuống client.
- Fetch trực tiếp trong component async, không cần `useState` hay `useEffect`.

Server Component không dùng được hook React, event handler hoặc API của trình duyệt.

### Client Component

Thêm directive `"use client"` ở đầu file khi component cần:

- `useState`, `useEffect` hoặc custom hook.
- Event như `onClick`, `onChange`.
- API trình duyệt như `localStorage` hoặc `window`.

Đánh đổi là JavaScript của component và các import trực tiếp của nó được gửi về browser.

Nguyên tắc thực dụng: mặc định dùng Server Component, chỉ tách phần cần tương tác thành Client Component nhỏ và đặt càng thấp trong cây càng tốt. Server Component có thể render Client Component và truyền data serializable xuống qua props.

### Rendering và caching

- **SSG (Static):** render lúc build; phù hợp nội dung ít thay đổi.
- **SSR (Dynamic):** render mỗi request; phù hợp dữ liệu thay đổi hoặc cá nhân hoá.
- **Caching:** trong Next 16, `fetch` không cache mặc định. Dùng `cache: "force-cache"` hoặc `next: { revalidate: N }` để cache; `revalidate` làm mới theo chu kỳ (ISR).
- **`generateStaticParams`:** pre-render các giá trị biết trước của dynamic route.

## Lab thực hành

1. Viết Server Component async fetch dữ liệu trực tiếp bằng `await fetch(...)`, không dùng `useEffect` hoặc `useState`.
2. Tạo Client Component có `"use client"`, dùng `useState` và `onClick`; xác định lý do component phải chạy ở client.
3. Lồng Client Component trong Server Component, truyền data qua props và xác nhận Server Component vẫn render được.
4. Thử SSG, SSR và cache với `next: { revalidate: N }`; dùng `generateStaticParams` để pre-render dynamic route.

## Đóng góp vào ShopLite

- Trang chủ `/` là Server Component: fetch danh sách sản phẩm từ DummyJSON ở server để HTML có sẵn nội dung cho SEO và tốc độ tải.
- `ProductGrid` và `ProductCard` là Server Component.
- Tách `SearchBar`, nút thêm giỏ và badge giỏ thành Client Component nhỏ vì chúng cần state, event hoặc Zustand.
- Ghi chú trong code phần nào chạy ở server và client để củng cố trực giác.

## Tiêu chí hoàn thành

- View Source của trang chủ có sẵn HTML sản phẩm, không phải trang trống chờ JavaScript.
- Giải thích được vì sao SearchBar cần `"use client"` còn danh sách sản phẩm thì không.
- Hiểu khác biệt SSG, SSR và thời điểm dùng `revalidate`.
