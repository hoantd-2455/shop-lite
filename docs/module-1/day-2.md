# Ngày 2: Flexbox & Grid

## Lý thuyết cơ bản

Đây là ngày quan trọng nhất của module, tập trung vào hai hệ thống layout hiện đại.

### Flexbox

Flexbox là layout một chiều: một hàng hoặc một cột. Đặt `display: flex` lên phần tử cha (flex container), các phần tử con trực tiếp trở thành flex item.

- Trục chính (main axis) được điều khiển bởi `flex-direction`.
- Căn chỉnh trên trục chính bằng `justify-content`.
- Căn chỉnh trên trục phụ bằng `align-items`.
- `flex: 1` cho phép item co giãn để lấp đầy không gian còn lại.

Dùng Flexbox cho navbar, hàng nút hoặc căn giữa một box.

### Grid

Grid là layout hai chiều, quản lý hàng và cột cùng lúc. Dùng `display: grid` kết hợp với `grid-template-columns`.

Mẹo responsive không cần media query:

```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

Trình duyệt tự tính số cột vừa với độ rộng hiện tại. Dùng Grid cho lưới sản phẩm, gallery và layout trang.

### Khi nào dùng Flexbox, khi nào dùng Grid?

| Nhu cầu | Công cụ |
| --- | --- |
| Layout một chiều theo hàng hoặc cột | Flexbox |
| Lưới đều theo hàng và cột | Grid |
| Một product card nằm trong lưới | Grid bên ngoài, Flexbox bên trong |

Trong thực tế, hai công cụ thường được lồng vào nhau: Grid cho bố cục lớn, Flexbox cho từng ô bên trong.

## Đóng góp vào ShopLite

1. Biến vùng sản phẩm ngày 1 thành lưới thật bằng Grid:

   ```css
   repeat(auto-fill, minmax(220px, 1fr))
   ```

   Thêm `gap` đều giữa các card.

2. Hoàn thiện product card với dữ liệu tĩnh. Mỗi card là một `article` dùng Flexbox theo cột: ảnh, tên, giá và nút **Thêm vào giỏ**. Dùng `margin-top: auto` để đẩy nút xuống đáy, giữ các card cao bằng nhau.
3. Tạo `product.html`: desktop có layout Grid hai cột với ảnh lớn bên trái và thông tin bên phải; trên mobile tự xếp thành một cột.

## Tiêu chí hoàn thành

- Lưới sản phẩm tự xuống dòng và đổi số cột theo độ rộng màn hình mà không dùng media query.
- Các product card cao bằng nhau; nút **Thêm vào giỏ** thẳng hàng ở đáy mọi card.
- Navbar không vỡ ở màn hẹp lẫn rộng; trang chi tiết có hai cột trên desktop và một cột trên mobile.
- Giải thích được khi nào nên dùng Flexbox và khi nào dùng Grid cho từng khối trong trang.
