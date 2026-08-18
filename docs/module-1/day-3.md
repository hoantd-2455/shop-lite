# Ngày 3: Responsive & Đánh Bóng Giao Diện

## Lý thuyết cơ bản

### Mobile-first

Viết CSS cho màn hình nhỏ làm base, rồi thêm style cho màn lớn bằng `@media (min-width: ...)`. Cách này gọn và ít ghi đè style hơn desktop-first.

### Media query

```css
@media (min-width: 768px) {
  /* Rule chỉ áp dụng khi viewport rộng từ 768px. */
}
```

Các breakpoint phổ biến:

- Khoảng `640px`: mobile lớn.
- Khoảng `768px`: tablet.
- Khoảng `1024px`: desktop.

### Đơn vị linh hoạt

- `rem`: theo font gốc; phù hợp cho spacing và font, dễ scale.
- `%` và `fr`: theo phần tử cha; phù hợp cho layout.
- `vw` và `vh`: theo viewport.
- `clamp(min, ideal, max)`: giá trị co giãn có giới hạn.

Ví dụ:

```css
font-size: clamp(1rem, 2vw, 1.5rem);
```

### CSS custom properties

Khai báo biến CSS ở `:root` và dùng lại bằng `var(...)`:

```css
:root {
  --color-primary: #2563eb;
}

button {
  background: var(--color-primary);
}
```

Không giống biến Sass, CSS custom properties chạy ở runtime. Chúng có thể đổi bằng JavaScript hoặc media query, nên là nền tảng tốt cho dark mode.

### Đánh bóng giao diện

- `transition`: chuyển động mượt khi hover hoặc focus.
- `box-shadow`: tạo chiều sâu.
- `border-radius`: bo góc nhất quán.

### Làm quen Tailwind CSS

Tailwind là cách style chủ đạo trong các dự án thật. Thay vì viết CSS riêng rồi đặt class tự định nghĩa, bạn ghép các utility class trực tiếp trên HTML:

```html
class="flex items-center gap-4 rounded-lg bg-white p-4 shadow"
```

Mỗi utility class tương ứng với một thuộc tính CSS nhỏ.

- Responsive dùng tiền tố breakpoint: `md:grid-cols-3` áp dụng từ `768px`; `lg:` áp dụng ở breakpoint lớn hơn. Các class không có tiền tố là base mobile-first.
- Trạng thái dùng tiền tố: `hover:bg-blue-600`, `focus:ring`, `dark:bg-gray-900`.
- Spacing và màu dùng theo thang thiết kế định sẵn, ví dụ `p-4`, `text-gray-700`; giao diện nhờ đó nhất quán hơn.

Bạn học CSS thuần trước vì Tailwind chỉ là cách viết nhanh hơn cho chính các thuộc tính CSS đã học: Flexbox, Grid, padding, color… Không hiểu CSS gốc thì dùng Tailwind sẽ thành chép class. Ở module này chỉ làm quen qua CDN; cài đặt Tailwind qua build tool sẽ làm ở React/Next.js.

## Lab thực hành

1. **Mobile-first thực chiến:** lấy lưới sản phẩm ngày 2, viết lại theo hướng mobile-first: base một cột, `@media (min-width: 640px)` hai cột, `@media (min-width: 1024px)` ba hoặc bốn cột. Dùng DevTools responsive mode để kiểm tra.
2. **CSS variables và dark mode:** khai báo bộ biến ở `:root` như `--color-primary`, `--color-bg`, `--color-text`, `--spacing`, `--radius`; thay giá trị cứng bằng `var(...)`. Tạo class `.dark` ghi đè biến và thử bật/tắt dark mode bằng cách đổi class.
3. **Đánh bóng giao diện:** thêm transition hover cho card/nút, `box-shadow`, `border-radius` đồng nhất qua biến và import web font từ Google Fonts.
4. **Làm quen Tailwind:** thêm đoạn sau vào một file thử:

   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```

   Dựng lại một product card chỉ bằng utility class:

   ```html
   class="flex flex-col gap-2 rounded-lg p-4 shadow hover:shadow-lg"
   ```

   Đặt cạnh card CSS thuần để so sánh mỗi utility class với thuộc tính CSS tương ứng.

## Đóng góp vào ShopLite

1. Làm trang giỏ hàng tĩnh (`cart.html`): danh sách item ở bên trái, mỗi dòng có ảnh nhỏ, tên, ô số lượng, đơn giá và nút xóa. Bên phải là khối tổng kết: tạm tính, phí ship, tổng cộng và nút **Thanh toán**. Desktop dùng hai cột; mobile xếp dọc.
2. Đồng bộ design system trên cả ba trang `index.html`, `product.html`, `cart.html` bằng một bộ CSS variables cho màu, spacing và bo góc.
3. Thêm trạng thái `:hover` và `:focus` cho mọi phần tử tương tác—card, nút, link—và đảm bảo responsive mượt từ `360px` tới desktop.

## Tiêu chí hoàn thành

- Cả ba trang `index.html`, `product.html`, `cart.html` hiển thị đẹp, không vỡ layout từ `360px` tới ít nhất `1280px`.
- Toàn bộ màu sắc, spacing và bo góc dùng chung CSS variables; đổi một biến thì cả site đổi theo.
- Dark mode bật/tắt được chỉ bằng cách đổi biến, không sửa từng rule.
- Dựng được một card bằng Tailwind và đối chiếu được mỗi utility class với thuộc tính CSS tương ứng.
- Commit, tag `v1-html` và push lên GitHub. Đây là cột mốc **giao diện tĩnh hoàn chỉnh**.
