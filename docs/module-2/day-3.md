# Ngày 3: Async, Fetch API & localStorage

## Lý thuyết cơ bản

JavaScript chạy đơn luồng, nhưng xử lý tác vụ chậm như mạng hoặc file bằng cơ chế bất đồng bộ mà không chặn luồng chính.

### Promise

Promise là object đại diện cho một kết quả sẽ có trong tương lai, với ba trạng thái:

```text
pending → fulfilled
        → rejected
```

Có thể xử lý Promise bằng `.then()`/`.catch()`, hoặc gọn hơn bằng `async`/`await`.

### `async`/`await`

Hàm có từ khóa `async` cho phép dùng `await` để chờ Promise theo cách đọc gần giống code đồng bộ. Dùng `try`/`catch` để bắt lỗi. Đây là cú pháp nên ưu tiên.

### Fetch API

```js
const response = await fetch(url);
const data = await response.json();
```

`fetch` trả về một `Response`. Nó không tự throw khi server trả `404` hoặc `500`, nên cần kiểm tra `response.ok` và tự ném lỗi khi cần.

Mọi UI gọi API cần quản lý ba trạng thái:

```text
loading → data
        → error
```

### `localStorage`

`localStorage` là kho key-value tồn tại qua reload. Nó chỉ lưu string, nên object hoặc array cần được chuyển đổi:

```js
localStorage.setItem("cart", JSON.stringify(cart));
const cart = JSON.parse(localStorage.getItem("cart"));
```

Các method chính là `setItem`, `getItem` và `removeItem`.

## Lab thực hành

1. **Promise và `async`/`await`:** viết `async function getJSON(url)` gọi `fetch`, kiểm tra `response.ok`, throw lỗi nếu cần và trả về `response.json()`. Bọc nơi gọi bằng `try`/`catch`; hiển thị loading trước request và tắt khi hoàn tất.
2. **Fetch thật:** gọi `https://dummyjson.com/products`, log kết quả và thử DevTools → Network → Offline để kiểm tra nhánh `catch` cùng UI error state.
3. **`localStorage`:** viết `saveCart(cart)` với `JSON.stringify` và `loadCart()` với `JSON.parse`, trả `[]` khi chưa có dữ liệu. Dùng `try`/`catch` để xử lý storage bị hỏng.

## Đóng góp vào ShopLite

### API sản phẩm

- Thay `data.js` hardcode bằng `GET /products` từ DummyJSON.
- Hiển thị skeleton/spinner khi tải và thông báo lỗi nếu request thất bại.

### Trang chi tiết động

- Đọc `id` từ query string, ví dụ `?id=1`.
- Gọi `GET /products/{id}`.
- Render ảnh, tên, giá, mô tả, rating và tồn kho.

### Giỏ hàng

- Bấm **Thêm vào giỏ**: nếu item đã tồn tại thì tăng `quantity`; nếu chưa có thì thêm item mới.
- Cập nhật badge số lượng ở header ngay lập tức bằng tổng `quantity`.
- `cart.html` đọc `localStorage`, render ảnh, tên, đơn giá, ô số lượng và nút xóa.
- Thay đổi quantity, xóa item và tính lại tổng tiền sau mọi thao tác.
- Tách logic giỏ sang `cart.js` với các hàm như `addToCart`, `removeFromCart`, `updateQuantity` và `getCartTotal`, chuẩn bị cho các module sau refactor.

## Tiêu chí hoàn thành

- Sản phẩm load từ API thật, có loading/error state tử tế và không để màn hình trắng khi mạng hỏng.
- Trang chi tiết mở đúng sản phẩm dựa trên `id` ở URL.
- Giỏ hàng còn nguyên sau reload nhờ `localStorage`; tăng/giảm/xóa hoạt động, tổng tiền luôn đúng và badge khớp số lượng.
- Commit và tag `v2-js`. Đây là cột mốc: **ShopLite đã là một ứng dụng động thật sự**.
