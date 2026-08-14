# Lộ trình Mini-project: ShopLite

ShopLite là một cửa hàng online thu nhỏ. Bạn sẽ xây lại nó bằng các công nghệ khác nhau—không làm lại từ đầu ở mỗi lần, mà tiến hóa dần: mỗi module nâng cấp sản phẩm của module trước.

E-commerce được chọn vì chạm vào các kỹ năng cốt lõi của một frontend developer: render danh sách, gọi API, tìm kiếm/lọc, quản lý state giỏ hàng, form và validation, routing nhiều trang, SEO và SSR.

## ShopLite tiến hóa qua từng module

| Module | Công nghệ | ShopLite ở giai đoạn này |
| --- | --- | --- |
| 1 | HTML/CSS | Trang tĩnh: danh sách sản phẩm, trang chi tiết, trang giỏ hàng; responsive, làm quen Tailwind, chưa có logic. |
| 2 | JavaScript | Trang động: render sản phẩm từ API, tìm kiếm/lọc, thêm vào giỏ và lưu giỏ bằng `localStorage`. |
| 3 | TypeScript | Refactor JavaScript sang TypeScript với Vite; định nghĩa type cho `Product`, `CartItem`. |
| 4 | ReactJS | Dựng lại thành SPA: component hóa bằng Tailwind, hooks, routing; fetch API bằng TanStack Query, form validation với React Hook Form + Zod, phân loại state và giỏ hàng với Zustand/Redux Toolkit; tối ưu render. |
| 5 | Next.js | Hoàn thiện với SSR/SSG, dynamic routes, API routes, auth bằng Auth.js và bảo vệ route, URL state, tích hợp store + TanStack Query, form validation, SEO, Core Web Vitals và deploy Vercel. |

Sau 18 ngày, bạn có một sản phẩm hoàn chỉnh trên Vercel để đưa vào portfolio hoặc CV.

## Tính năng của ShopLite

Đây là tập tính năng đích; bạn sẽ xây dần qua các module, không phải hoàn thành hết ngay từ đầu.

- **Danh sách sản phẩm:** lưới sản phẩm có ảnh, tên, giá, đánh giá; phân trang hoặc tải thêm.
- **Tìm kiếm và lọc:** tìm kiếm real-time theo từ khóa, lọc theo danh mục, sắp xếp theo giá.
- **Trang chi tiết sản phẩm:** ảnh lớn, mô tả, giá, tồn kho và nút **Thêm vào giỏ**.
- **Giỏ hàng:** thêm/xóa sản phẩm, tăng/giảm số lượng, tính tổng tiền và lưu qua reload (`localStorage` → store).
- **Thanh toán:** form thông tin giao hàng có validation và xác nhận đặt hàng.
- **Đăng nhập và tài khoản:** đăng nhập, session và route được bảo vệ.
- **Đơn hàng của tôi:** chỉ truy cập được khi đã đăng nhập, hiển thị đơn của người dùng.
- **Trải nghiệm và chất lượng:** responsive từ mobile đến desktop, trạng thái loading/error, SEO ở bản Next.js và tối ưu tốc độ.

Không phải module nào cũng có đủ các tính năng này; mỗi module bổ sung thêm một lớp cho tới khi hoàn chỉnh ở Next.js.

## Nguồn dữ liệu

Các API miễn phí, không cần đăng ký:

- [DummyJSON](https://dummyjson.com/): có products, carts, auth và search; đây là lựa chọn được khuyến nghị.
- [Fake Store API](https://fakestoreapi.com/): đơn giản hơn, dùng làm phương án dự phòng.

### API DummyJSON dùng trong ShopLite

DummyJSON là REST API giả lập dữ liệu e-commerce. Mọi endpoint hỗ trợ phân trang qua query parameter như `?limit=&skip=`, chọn trường qua `?select=` và mô phỏng độ trễ qua `?delay=`. Các thao tác ghi (`add`, `update`, `delete`) chỉ mô phỏng: server trả kết quả nhưng không lưu thật.

| Mục đích | Endpoint | Ghi chú |
| --- | --- | --- |
| Danh sách sản phẩm | `GET /products` | Mặc định 30 item; dùng `?limit=10&skip=20` để phân trang. |
| Chi tiết sản phẩm | `GET /products/{id}` | Trả về object sản phẩm đầy đủ. |
| Tìm kiếm | `GET /products/search?q=phone` | Trả về `{ products, total, skip, limit }`. |
| Danh sách danh mục | `GET /products/categories` | Mảng object `{ slug, name, url }`. |
| Sản phẩm theo danh mục | `GET /products/category/{slug}` | Ví dụ: `/products/category/smartphones`. |
| Đăng nhập | `POST /auth/login` | Body `{ username, password }`; trả về token JWT. |
| Thông tin user hiện tại | `GET /auth/me` | Gửi header `Authorization: Bearer <token>`. |
| Giỏ hàng | `GET /carts`, `POST /carts/add` | Dùng để tham khảo; ShopLite tự quản lý giỏ phía client. |

Cấu trúc một sản phẩm gồm các trường chính: `id`, `title`, `description`, `price`, `discountPercentage`, `rating`, `stock`, `category`, `thumbnail`, `images`. Xem thêm [Products documentation](https://dummyjson.com/docs/products) và [Auth documentation](https://dummyjson.com/docs/auth).

## Cấu trúc tài liệu

| Module | Số ngày |
| --- | ---: |
| Markup: HTML & CSS | 3 |
| JavaScript | 3 |
| TypeScript | 2 |
| ReactJS, gồm TanStack Query, RHF + Zod, Redux Toolkit | 5 |
| Next.js, gồm tích hợp Redux Toolkit + TanStack Query | 5 |
| **Tổng** | **18** |

## Cách dùng tài liệu hiệu quả

- Đọc mục tiêu module trước, rồi vào từng ngày. Mỗi ngày gồm: Mục tiêu → Lab → Đóng góp vào ShopLite → Tiêu chí “done”.
- Gõ tay 100% code lab, không copy-paste. Vì bạn đã có nền lập trình, đừng sa đà vào lý thuyết: bí chỗ nào thì tra chỗ đó theo hướng just-in-time, đừng học trước phòng xa.
- Commit Git vào cuối mỗi ngày. Tạo repository `shoplite` từ ngày 1. Mỗi module có thể nằm ở một nhánh hoặc thư mục riêng, chẳng hạn `v1-html`, `v2-js`, `v3-ts`.
- “Done” là điều kiện để qua ngày mới, không phải chỉ đọc hết là xong. Nếu chưa đạt tiêu chí, hãy ở lại làm tiếp.
- Tận dụng nền tảng sẵn có. Ghi chú **Tập trung vào** của mỗi module chỉ ra phần khác biệt so với ngôn ngữ/framework bạn đã biết; đừng tốn thời gian cho phần đã quen.

## Chuẩn bị môi trường

Hoàn thành trước ngày 1:

- Node.js LTS (`node -v` ≥ 20) và npm.
- VS Code cùng các extensions: ESLint, Prettier, ES7+ React snippets, Tailwind CSS IntelliSense.
- Git và tài khoản GitHub.
- Chrome hoặc Edge để dùng DevTools.
- Tài khoản Vercel, đăng nhập bằng GitHub, để deploy ở module cuối.

## Định nghĩa hoàn thành lộ trình

- ShopLite chạy trên Vercel với URL public, có đăng nhập và route được bảo vệ.
- Code đã đẩy lên GitHub, có README mô tả dự án và hướng dẫn chạy local.
- Tự giải thích được server vs. client component; phân loại server/URL/client state và chọn công cụ phù hợp; session/JWT và lý do chặn route ở server; khi nào nên hoặc không nên dùng memo.
- Làm lại được một CRUD cơ bản có form validation mà không cần xem lại tài liệu.
