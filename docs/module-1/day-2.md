Ngày 2 Flexbox & Grid

📖 Lý thuyết cơ bản

Đây là ngày quan trọng nhất của module. Hai hệ thống layout hiện đại:

Flexbox — layout 1 chiều (một hàng hoặc một cột). Đặt display: flex lên phần tử cha (flex container), các con thành flex item. Trục chính (main axis) điều khiển bằng flex-direction; căn chỉnh dọc main axis bằng justify-content, dọc trục phụ bằng align-items. flex: 1 cho item co giãn lấp đầy. Dùng cho: navbar, hàng nút, căn giữa một box.

Grid — layout 2 chiều (hàng và cột cùng lúc). display: grid + grid-template-columns. Mẹo vàng cho responsive không cần media query: grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) — tự động xếp số cột vừa với độ rộng. Dùng cho: lưới sản phẩm, gallery, layout trang.

Khi nào dùng cái nào? Một chiều (theo hàng/cột) → Flexbox. Lưới đều theo cả 2 chiều → Grid. Thực tế thường lồng nhau: Grid cho bố cục lớn, Flex cho từng ô bên trong.

🛒 Đóng góp vào ShopLite
Biến vùng sản phẩm rỗng ở ngày 1 thành lưới sản phẩm thật: dùng Grid với repeat(auto-fill, minmax(220px, 1fr)) cho khu vực sản phẩm, gap đều giữa các card.
Hoàn thiện product card (vẫn dữ liệu tĩnh): mỗi card là một article dùng Flex theo chiều dọc — ảnh trên, tên sản phẩm, giá, nút "Thêm vào giỏ" dưới cùng; dùng margin-top: auto để đẩy nút xuống đáy cho các card cao bằng nhau.
Tạo trang chi tiết sản phẩm (product.html): layout 2 cột bằng Grid — ảnh lớn bên trái, khối thông tin (tên, giá, mô tả, nút thêm giỏ) bên phải; trên mobile tự xếp thành 1 cột.

✅ Tiêu chí hoàn thành
Lưới sản phẩm tự xuống dòng và đổi số cột theo độ rộng màn hình mà không dùng một media query nào.
Các product card cao bằng nhau, nút "Thêm vào giỏ" thẳng hàng ở đáy mọi card.
Navbar không vỡ ở cả màn hẹp lẫn rộng; trang chi tiết 2 cột trên desktop, 1 cột trên mobile.
Bạn nói được khi nào nên dùng Flex, khi nào nên dùng Grid cho từng khối trong trang.