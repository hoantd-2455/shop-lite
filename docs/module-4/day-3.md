Ngày 3 useEffect & Data Fetching

📖 Lý thuyết cơ bản
Side effect: việc "ngoài render" — gọi API, set timer, đụng vào API trình duyệt. React render phải thuần túy, nên effect tách riêng.

useEffect: useEffect(() => { ... }, [deps]). Hàm chạy sau render. Dependency array quyết định khi nào chạy lại:

- [] → chạy một lần sau mount (hợp để fetch ban đầu).
- [dep] → chạy lại khi dep đổi.
- không có array → chạy sau mọi render (hiếm khi cần, dễ gây loop).
- return () => {...} → cleanup (huỷ timer, huỷ subscription) trước lần chạy kế / khi unmount.

Fetch trong React: gọi API trong useEffect, lưu kết quả vào state. Luôn quản lý 3 state: loading, data, error. (Lưu ý: React hiện đại khuyến khích dùng thư viện như TanStack Query cho data fetching thực tế, nhưng nắm useEffect trước.)

Custom hook: hàm bắt đầu bằng use... gói logic dùng chung (vd useProducts()) — tái sử dụng giữa các component. Đây là cách React chia sẻ logic.

Fetch bằng thư viện — TanStack Query (React Query): tự viết useEffect + 3 state (loading/data/error) lặp đi lặp lại, lại thiếu caching, refetch, retry, chống race condition. Trong dự án thật người ta dùng TanStack Query để quản lý "server state" (dữ liệu thuộc về server, vd danh sách sản phẩm):

- Bọc app bằng <QueryClientProvider>.
- useQuery({ queryKey: ['products'], queryFn: fetchProducts }) → trả về data, isLoading, isError sẵn, tự cache theo queryKey, tự refetch khi cần, dedupe request trùng.
- useMutation cho thao tác ghi (POST/PUT/DELETE).
- Phân biệt quan trọng: server state (dữ liệu từ API — sản phẩm) ≠ client state (state UI cục bộ — giỏ hàng, theme). TanStack Query lo server state; client state để useState/Context/Redux. Đây là tư duy chia state then chốt của dự án hiện đại.
- (SWR là thư viện tương tự, nhẹ hơn; biết là đủ. RTK Query — học ở Day 4 — là bản tích hợp sẵn trong Redux, chọn 1 trong 2.)

🧪 Lab — thực hành
useEffect (hiểu bản chất): thực hành dependency array ([], [dep], không có) và cleanup; tự viết hook useProducts bằng useEffect + 3 state (loading/data/error) để nắm gốc vấn đề.
Refactor sang TanStack Query: cài @tanstack/react-query, bọc app bằng <QueryClientProvider>, viết lại useProducts bằng useQuery({ queryKey, queryFn }).
So sánh & quan sát cache: rời trang rồi quay lại, mở DevTools Network để thấy TanStack Query không gọi API lại ngay (phục vụ từ cache) và refetch nền khi cần.

🛒 Đóng góp vào ShopLite
Chuyển sang fetch thật + TanStack Query: danh sách sản phẩm dùng useProducts (bọc useQuery) gọi DummyJSON GET /products.
Trang chi tiết dùng useQuery(['product', id], () => getProduct(id)).
Trải nghiệm tải: hiển thị skeleton/spinner khi isLoading, thông báo lỗi + nút thử lại khi isError.
Xác lập rõ ranh giới: sản phẩm = server state (TanStack Query lo); giỏ hàng tạm vẫn là client state (ngày 4 chuyển sang store).

✅ Tiêu chí hoàn thành
Sản phẩm và trang chi tiết load qua TanStack Query, có đủ trạng thái loading/error tử tế.
Logic fetch nằm trong custom hook tái dùng được (useProducts, useProduct).
Bạn quan sát được cache hoạt động và giải thích được khác biệt server state vs client state.