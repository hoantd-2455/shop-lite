Ngày 3
Dynamic Routes, Route Handlers & bảo vệ route (middleware)

📖 Lý thuyết cơ bản
Dynamic route: thư mục đặt trong ngoặc vuông app/product/[id]/page.tsx khớp /product/123. Component nhận params chứa giá trị (params.id), fetch theo đó ở server.

generateStaticParams: liệt kê trước các giá trị id để Next pre-render (SSG) các trang đó lúc build → nhanh + tốt SEO.

Route Handler (API trong Next): file app/api/.../route.ts export hàm theo HTTP method (GET, POST...). Đây là backend nhỏ ngay trong Next — nhận Request, trả Response/JSON. Dùng để xử lý form, gọi DB, ẩn secret.

loading.tsx / error.tsx: đặt cạnh page.tsx để Next tự bọc UI loading (qua React Suspense) và error boundary cho route đó — không cần code thủ công.

Middleware & bảo vệ route (nền cho Authentication ở Day 4): file middleware.ts ở gốc chạy trước mỗi request khớp matcher — dùng để kiểm tra đăng nhập rồi cho qua hoặc redirect về /login. Đây là tầng authorization (phân quyền truy cập route):

Authentication = "bạn là ai" (đăng nhập). Authorization = "bạn được làm gì" (vào được route nào).
Trong Next, route cần bảo vệ (vd /orders, /checkout) thường được chặn ở middleware (kiểm tra session/token) và/hoặc kiểm tra lại trong Server Component.
Bài học quan trọng: kiểm tra phía client chỉ để trải nghiệm (ẩn nút); bảo vệ thật phải ở server/middleware — đừng tin client.

🧪 Lab — thực hành
Dynamic route: tạo app/product/[id]/page.tsx, đọc params.id, fetch sản phẩm theo id ở server; render trang chi tiết đầy đủ.
generateStaticParams: liệt kê trước một số id để Next pre-render (SSG) các trang sản phẩm phổ biến lúc build.
Route Handler: viết app/api/.../route.ts export GET/POST trả JSON — backend nhỏ ngay trong Next; thử gọi từ trình duyệt/fetch.
loading.tsx & error.tsx: thêm hai file này cạnh page.tsx để có UI loading (Suspense) và error boundary tự động cho route.
Middleware: viết middleware.ts với matcher chặn một route (vd /orders); chưa có auth thật thì tạm đọc một cookie giả để hiểu cơ chế redirect.

🛒 Đóng góp vào ShopLite
Trang chi tiết /product/[id] hoàn chỉnh: fetch theo id ở server, hiển thị ảnh/tên/giá/mô tả/tồn kho, nút "Thêm vào giỏ" (client component nhỏ); thêm generateStaticParams cho vài sản phẩm.
Route Handler app/api/orders/route.ts: nhận POST đơn hàng (mô phỏng xử lý phía server, trả về mã đơn) — chuẩn bị cho checkout ngày 4.
Thêm loading.tsx cho trang chủ và trang chi tiết để trải nghiệm tải mượt.
Tạo middleware.ts bảo vệ trước /orders và /checkout (ngày 4 gắn session Auth.js thật vào).

✅ Tiêu chí hoàn thành
Click một sản phẩm → vào đúng trang chi tiết của nó; vài trang sản phẩm được pre-render (SSG).
Route Handler tự viết hoạt động (gọi được, trả JSON đúng).
Có loading UI khi chuyển trang; middleware redirect đúng khi truy cập route được bảo vệ lúc chưa "đăng nhập".
Bạn phân biệt rõ authentication (bạn là ai) vs authorization (được vào đâu), và vì sao phải chặn ở server chứ không chỉ ở client.
