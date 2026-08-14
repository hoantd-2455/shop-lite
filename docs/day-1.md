# Ngày 1: HTML Semantic & CSS Nền Tảng

## Lý thuyết cơ bản

### HTML semantic

HTML semantic là việc dùng thẻ đúng ý nghĩa thay vì dùng `div` cho mọi thứ. Các thẻ `header`, `nav`, `main`, `section`, `article`, `aside` và `footer` mô tả vai trò của nội dung, giúp SEO, screen reader và việc đọc code tốt hơn.

Quy tắc:

- Mỗi trang chỉ có một thẻ `main`.
- Heading đi đúng thứ tự: `h1` → `h2` → `h3`; không nhảy cóc.

### Box model

Mọi element là một hộp gồm `content` → `padding` → `border` → `margin`, tính từ trong ra ngoài. Mặc định, `width` chỉ tính phần content. Đặt `box-sizing: border-box` để `width` bao gồm cả padding và border; đây gần như luôn là lựa chọn nên dùng.

### Selector & specificity

Khi nhiều CSS rule cùng tác động một element, rule có specificity cao hơn sẽ thắng:

1. Inline style
2. ID (`#`)
3. Class, attribute và pseudo-class (`.`, `[]`, `:hover`)
4. Selector theo thẻ (`div`)

Nếu specificity bằng nhau, rule viết sau sẽ thắng. Hiểu điều này để không lạm dụng `!important`.

### Cascade & inheritance

Một số thuộc tính như màu chữ và font tự kế thừa xuống phần tử con. Các thuộc tính layout như `margin` và `border` thì không.

## Đóng góp vào ShopLite

1. Khởi tạo repository `shoplite` trên GitHub, tạo thư mục `v1-html/`, thêm `README.md` ngắn mô tả dự án và tạo commit đầu tiên.
2. Dựng khung HTML semantic cho trang danh sách sản phẩm (`index.html`):
   - `header`: logo (text hoặc ảnh), một ô tìm kiếm chỉ có UI tĩnh, và icon giỏ hàng kèm badge số lượng tĩnh.
   - `main`: một `section` chứa tiêu đề **Sản phẩm** và khu vực chứa lưới sản phẩm. Ngày 2 mới hoàn thiện lưới; tạm đặt 3–4 thẻ `article.product-card` placeholder để hình dung.
   - `footer`: thông tin shop và vài liên kết giả.
3. Đặt nền tảng CSS trong `style.css`: reset cơ bản, thêm `* { box-sizing: border-box; }`, bỏ `margin` mặc định và import một web font.

## Tiêu chí hoàn thành

- `index.html` validate không lỗi tại [validator.w3.org](https://validator.w3.org/) bằng cách dán URL hoặc code.
- Cây HTML chỉ dùng `div` khi không có thẻ semantic phù hợp; có đúng một `main` và heading không nhảy bậc.
- Giải thích được vì sao một selector thắng selector khác trong bài lab 3, và `box-sizing: border-box` thay đổi cách tính `width` như thế nào.
- Đã commit và push lên GitHub.
