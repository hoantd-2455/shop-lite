# Day 3 — `useEffect` và Data Fetching

## Mục tiêu trong ngày

- Hiểu side effect và dependency array của `useEffect`.
- Phân biệt render thuần túy với thao tác ngoài React.
- Tạo custom hook để tái sử dụng logic fetch.
- Quản lý server state bằng TanStack Query.

## Kiến thức trọng tâm

### Side effect và `useEffect`

Side effect là công việc ngoài quá trình render, ví dụ gọi API, tạo timer hoặc thay đổi `document.title`. Render React nên thuần túy: cùng props/state thì tạo cùng UI.

```tsx
useEffect(() => {
  document.title = "ShopLite";

  return () => {
    // cleanup khi component unmount hoặc trước effect tiếp theo
  };
}, []);
```

Dependency array quyết định khi effect chạy lại:

| Dependency | Khi chạy |
| --- | --- |
| `[]` | Một lần sau mount |
| `[value]` | Sau mount và khi `value` thay đổi |
| Không có array | Sau mọi render; hiếm khi cần |

### Fetch thủ công và custom hook

Nếu fetch bằng `useEffect`, component thường phải quản lý ba state: `loading`, `data`, `error`. Custom hook như `useProducts()` gói logic này để component chỉ nhận kết quả cần hiển thị.

### TanStack Query và server state

Trong ứng dụng thật, TanStack Query thay phần fetch lặp lại bằng `useQuery`:

```tsx
useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});
```

Query key định danh data trong cache. TanStack Query quản lý loading, error, retry, refetch và cache; sản phẩm là server state nên không nên đưa vào Zustand/Redux.

## Lab

1. Thử `useEffect` với `[]`, `[value]` và cleanup timer.
2. Viết fetch thủ công có ba state `loading/data/error` để hiểu vấn đề.
3. Refactor logic đó thành custom hook.
4. Cài `@tanstack/react-query`, tạo `QueryClientProvider`.
5. Quan sát Network khi mở lại cùng một query để thấy cache hoạt động.

## Áp dụng vào ShopLite

- `QueryClientProvider` bọc toàn bộ app.
- `useProducts()` fetch danh sách từ DummyJSON với key `["products"]`.
- `useProduct(id)` fetch chi tiết với key `["product", id]`.
- List và detail đều có skeleton khi pending, error message và nút retry.
- `ProductDetail` dùng `useEffect` để đổi `document.title`, rồi cleanup khi đóng panel.
- API response được kiểm tra bằng type guard trước khi dùng như `Product`.

## Hoàn thành khi

- Danh sách và chi tiết sản phẩm dùng TanStack Query.
- Logic query nằm trong custom hook tái sử dụng.
- Có loading, error và retry rõ ràng.
- Giải thích được server state khác client state và query key tạo cache như thế nào.
