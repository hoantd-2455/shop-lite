# Ngày 5 — React Router & tối ưu hiệu năng

## Lý thuyết cơ bản

### SPA và React Router

SPA (_Single Page Application_) chỉ tải một trang HTML; JavaScript thay đổi nội dung khi điều hướng thay vì tải lại toàn bộ trang. Router đảm nhiệm việc ánh xạ URL tới component tương ứng.

- Bọc ứng dụng bằng `<BrowserRouter>`.
- Khai báo `<Routes>` chứa các `<Route path="..." element={...} />`.
- Điều hướng bằng `<Link to="...">`, không dùng thẻ `<a>` cho đường dẫn nội bộ để tránh reload trang.
- Route động như `path="/product/:id"` đọc tham số bằng `useParams()`.
- Điều hướng bằng code dùng `useNavigate()`.
- Route `path="*"` là trang 404.
- Layout route dùng `<Outlet />` để các route lồng nhau chia sẻ Header và Footer.

### Tối ưu hiệu năng

React render lại component khi `state` hoặc `props` thay đổi. Render thừa thường không đáng lo; chỉ tối ưu sau khi đo bằng React DevTools Profiler.

- `React.memo`: bỏ qua render khi props không đổi theo so sánh nông. Phù hợp cho component lá như `ProductCard` trong danh sách lớn.
- `useMemo`: cache kết quả tính toán tốn kém, ví dụ lọc hoặc sắp xếp danh sách dài.
- `useCallback`: cache tham chiếu hàm khi truyền hàm đó xuống component con đã dùng `memo`.

Mỗi kỹ thuật đều có chi phí so sánh và bộ nhớ. Quy tắc là viết code bình thường trước, dùng Profiler tìm nút thắt, rồi chỉ tối ưu đúng chỗ. React 19 có React Compiler, vì vậy tối ưu thủ công đang giảm dần trong nhiều tình huống.

### Code splitting và lazy load

```tsx
const Page = React.lazy(() => import("./Page"));

<Suspense fallback={<p>Đang tải...</p>}>
  <Page />
</Suspense>;
```

Mỗi page chỉ được tải khi người dùng cần, giúp bundle ban đầu nhỏ hơn.

## Lab thực hành

1. Cài React Router và cấu hình `BrowserRouter`, `Routes`, `Route`, `Link`.
2. Tạo route động `/product/:id` với `useParams()`, nút quay lại với `useNavigate()`, và route 404 `*`.
3. Dùng layout route và `<Outlet />` cho Header/Footer chung.
4. Chuyển các page sang `React.lazy()` kết hợp `Suspense`; mở tab Network để quan sát các chunk được tải theo route.
5. Dùng React DevTools Profiler khi gõ search. So sánh trước/sau khi dùng `React.memo` cho `ProductCard` và `useMemo` cho lọc/sắp xếp. Chỉ giữ tối ưu thực sự có tác dụng.

## Đóng góp vào ShopLite

- Routing đầy đủ: `/` cho danh sách, `/product/:id` cho chi tiết fetch theo id, `/cart` cho giỏ hàng; tất cả page được lazy-load.
- Trang chi tiết có nút thêm vào giỏ và nút quay lại.
- Trang giỏ hỗ trợ tăng/giảm/xóa, hiện tổng tiền, và có nút thanh toán tạm thời bằng `alert`.
- `ProductCard` dùng `React.memo`; hàm lọc search dùng `useMemo`.
- Rà soát tách component, console không cảnh báo, và giao diện responsive.

## Tiêu chí hoàn thành

ShopLite chạy như một SPA hoàn chỉnh: điều hướng mượt giữa danh sách, chi tiết và giỏ hàng; giỏ hàng dùng xuyên suốt các trang; mỗi route được lazy-load thành chunk riêng. Bạn dùng Profiler để chỉ ra render thừa và giải thích được khi nào nên hoặc không nên dùng `memo` và `useMemo`.

Sau khi hoàn thành, commit và tạo tag `v4-react`.
