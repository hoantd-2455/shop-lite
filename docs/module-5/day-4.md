Ngày 4
Form/Validation, Authentication (Auth.js), state & tích hợp store

📖 Lý thuyết cơ bản
Form trong Next — 2 cách chính:

Server Actions: hàm gắn 'use server', gọi trực tiếp từ form (<form action={fn}>) — xử lý ngay ở server, không cần tự viết API. Cách hiện đại được Next khuyến nghị.
Client form + Route Handler: form client thu thập dữ liệu, fetch POST tới app/api/.... Quen thuộc nếu bạn từ nền REST. Đây là chỗ dùng lại React Hook Form + Zod y như đã học ở module React.
Validation: luôn validate dữ liệu form. Zod định nghĩa schema (z.object({ email: z.string().email() })); ghép React Hook Form qua @hookform/resolvers/zod. Nhớ: validate cả client (UX) và server (an toàn) — có thể tái dùng chung một Zod schema cho cả hai phía, đây là lợi thế lớn của Zod trong Next.

Authentication với Auth.js (NextAuth): thư viện xác thực phổ biến nhất cho Next, lo hết phần khó của auth:

Session: sau đăng nhập, Auth.js tạo session (mặc định lưu trong cookie JWT đã mã hóa) → request sau biết "ai đang đăng nhập".
JWT vs session-cookie: JWT là token tự chứa thông tin (stateless, không cần tra DB mỗi request); session lưu server thì kiểm soát tốt hơn nhưng cần store. Auth.js mặc định JWT trong cookie — đủ cho phần lớn app.
Provider đăng nhập: Credentials (email/mật khẩu tự quản), hoặc OAuth (Google/GitHub...). Học Credentials trước cho dễ hình dung.
Đọc session: ở Server Component dùng auth(); ở Client Component dùng useSession() (qua <SessionProvider>).
Gắn với middleware (Day 3): middleware đọc session để chặn route chưa đăng nhập (/orders, /checkout). Nhắc lại nguyên tắc: chặn thật ở server/middleware, client chỉ để ẩn/hiện UI.
Phân loại state trong Next khác React thuần thế nào (quan trọng): mô hình server/client của Next làm "bức tranh state" gọn hơn hẳn:

Server state thường không cần thư viện client: fetch thẳng trong Server Component (Day 2) và render sẵn HTML. Chỉ phần cần realtime/cache/refetch phía client mới cần TanStack Query.
URL state là first-class trong Next: filter, phân trang, từ khóa search nên để trên URL qua searchParams (Server Component đọc trực tiếp) hoặc useSearchParams (client) → share link được, SEO tốt, back/forward đúng. Đừng nhét mấy thứ này vào Redux.
Client state còn lại (giỏ hàng, theme, modal) mới dùng store client — Zustand hoặc Redux Toolkit. (Session đăng nhập do Auth.js quản, không tự nhét vào store.)
→ Hệ quả: trong Next, lượng global client state cần một store thường ít hơn React SPA thuần. Với ShopLite gần như chỉ còn giỏ hàng là thực sự cần store.

Tích hợp thư viện client (Zustand / Redux Toolkit / TanStack Query) với App Router — điểm dễ vấp:

Các thư viện này dùng React Context + hooks → bắt buộc chạy trong Client Component. Cách làm chuẩn:

Tạo một file Provider riêng đánh dấu 'use client' (vd providers.tsx) chứa <Provider store={store}> (Redux) và/hoặc <QueryClientProvider> (TanStack Query) và <SessionProvider> (Auth.js, nếu dùng useSession). (Zustand thì nhẹ hơn: store là hook, thường không cần Provider — nhưng trong Next nên khởi tạo per-request để tránh chia sẻ giữa người dùng.)
Import Provider đó vào app/layout.tsx (layout vẫn là Server Component, chỉ phần Provider là client) → bọc {children}.
Lưu ý store ở server: không tạo store / QueryClient ở phạm vi module dùng chung cho mọi request (rò rỉ dữ liệu giữa người dùng). Tạo store per-request (khởi tạo trong Provider bằng useState(() => ...)/useRef).

🧪 Lab — thực hành
Form + validation: dựng form thanh toán (họ tên, email, địa chỉ, số điện thoại) bằng React Hook Form + Zod (client) hoặc Server Action + Zod (server); hiển thị lỗi từng trường, trạng thái loading khi gửi, thông báo thành công/thất bại.
Auth.js: cài next-auth, cấu hình Credentials provider (dùng DummyJSON POST /auth/login hoặc tạm 1 user mẫu); làm form Đăng nhập bằng RHF + Zod; lưu session.
Bảo vệ route thật: cập nhật middleware.ts (ngày 3) để đọc session Auth.js → chặn /orders và /checkout khi chưa đăng nhập; thêm nút Đăng nhập/Đăng xuất ở Header (đọc session bằng useSession/auth()).
Provider client: tạo providers.tsx ('use client') bọc store giỏ hàng + <SessionProvider> (+ <QueryClientProvider> nếu dùng), gắn vào layout.tsx; khởi tạo store per-request để tránh rò rỉ giữa người dùng.
URL state: chuyển tìm kiếm/lọc sản phẩm sang searchParams (vd /?q=...&category=...&page=2); kiểm tra refresh/back/forward và share link đều giữ đúng bộ lọc.
Reuse schema: tách Zod schema (checkout, login) ra file dùng chung cho cả client form và Route Handler.

🛒 Đóng góp vào ShopLite
Migrate store giỏ hàng (Zustand hoặc Redux + cartSlice) từ module React sang, bọc trong providers.tsx; trang /cart đọc giỏ từ store, tăng/giảm/xóa, hiện tổng tiền.
Đăng nhập bằng Auth.js: trang /login (RHF + Zod), Header hiển thị tên người dùng + nút Đăng xuất khi đã đăng nhập.
Trang "Đơn hàng của tôi" /orders: route được middleware bảo vệ, đọc session để hiển thị đơn của user (tạm mock danh sách đơn nếu DummyJSON không có sẵn).
Search/filter chuyển sang URL state (searchParams) — đúng cách làm thực tế trong Next.
Checkout hoàn chỉnh: /checkout (route được bảo vệ) — form RHF + Zod, submit → Route Handler POST /api/orders (validate lại bằng chung schema) → trang "Đặt hàng thành công" → clearCart().

✅ Tiêu chí hoàn thành
Luồng mua hàng đầu-cuối chạy thông: đăng nhập → duyệt/tìm sản phẩm → thêm giỏ → checkout (yêu cầu đăng nhập) → validate cả client + server → xác nhận đặt hàng → giỏ được xóa.
Trang /orders và /checkout chỉ vào được khi đã đăng nhập (middleware chặn thật ở server).
Store giỏ hàng hoạt động đúng trong Next (không lỗi hydration, không rò rỉ giữa request); tìm kiếm/lọc nằm trên URL (share link giữ nguyên bộ lọc).
Bạn giải thích được session/JWT hoạt động ra sao và vì sao bảo vệ route phải ở server.
