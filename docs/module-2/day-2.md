# Ngày 2: DOM, Event & Render Động

## Lý thuyết cơ bản

### DOM

DOM (Document Object Model) là cây object mà trình duyệt tạo từ HTML để JavaScript thao tác.

```js
document.querySelector(".card");
document.querySelectorAll(".card");
```

Các thao tác thường dùng:

- Tạo element: `document.createElement(...)`.
- Sửa nội dung: `element.textContent`, `element.innerHTML`.
- Thêm/xóa element: `append`, `remove`.
- Đổi class: `classList.add`, `classList.remove`, `classList.toggle`.

### Render từ data

Thay vì viết HTML bằng tay, sinh HTML từ mảng dữ liệu:

```js
list.map((item) => "<div>...</div>").join("");
```

Sau đó gán kết quả vào `innerHTML`. Đây là tư duy nền tảng dẫn tới React sau này.

### Event

Gắn event listener bằng:

```js
element.addEventListener("click", handler);
```

Object `event` chứa thông tin sự kiện, chẳng hạn `event.target` là phần tử bị tác động. Dùng `event.preventDefault()` để chặn hành vi mặc định, ví dụ chặn form submit và reload trang.

### Event delegation

Thay vì gắn listener cho từng nút—vừa tốn kém, vừa không áp dụng được cho element tạo động—hãy gắn một listener tại container cha. Dựa vào `event.target` để nhận biết nút nào được bấm.

Kỹ thuật này dựa trên event bubbling: sự kiện nổi từ element con lên element cha.

## Lab thực hành

1. **Render từ data:** viết `renderProducts(list)` nhận mảng và sinh product card bằng `list.map(...).join("")`, sau đó gán vào `innerHTML` của container. Tách `productCardHTML(product)` thành hàm riêng, trả về HTML cho một card.
2. **Event delegation:** gắn một click listener tại container lưới. Trong handler, dùng `event.target.closest("[data-id]")` để tìm card hoặc nút được bấm; không gắn listener cho từng button.
3. **Tìm kiếm real-time:** lắng nghe event `input` của ô tìm kiếm, lọc không phân biệt hoa/thường và render lại ngay khi gõ. Hiển thị **Không tìm thấy sản phẩm** khi kết quả rỗng.

## Đóng góp vào ShopLite

- Thay toàn bộ card placeholder tĩnh bằng render động từ `data.js`.
- Làm thanh tìm kiếm hoạt động bằng cách tái sử dụng `filterByKeyword` của Day 1.
- Dùng event delegation cho nút **Thêm vào giỏ**. Tạm thời chỉ `console.log` product tương ứng; Day 3 mới nối với `localStorage`.
- Thêm `data-id` cho card hoặc button để truy ngược product được bấm.

## Tiêu chí hoàn thành

- Trang sản phẩm render hoàn toàn từ JavaScript; không còn product card viết tay trong HTML.
- Tìm kiếm lọc đúng và mượt khi gõ, có empty state hợp lý.
- Toàn bộ nút **Thêm vào giỏ** chỉ dùng một listener qua event delegation; bấm nút nào log đúng product đó.
