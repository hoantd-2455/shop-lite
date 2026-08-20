# Ngày 1: JavaScript Hiện Đại (ES6+)

## Lý thuyết cơ bản

### Khai báo biến

- Dùng `const` làm mặc định khi không cần gán lại biến.
- Dùng `let` khi cần gán lại biến.
- Bỏ qua `var` vì scope của nó dễ gây nhầm lẫn.

`const` và `let` đều có block scope.

### Array methods

Đây là phần cốt lõi của JavaScript hiện đại. Thay vì dùng vòng `for`, ưu tiên các hàm trả về mảng mới theo hướng bất biến:

| Method | Mục đích |
| --- | --- |
| `map(fn)` | Biến đổi từng phần tử, trả về mảng cùng độ dài. |
| `filter(fn)` | Giữ các phần tử thỏa điều kiện. |
| `reduce(fn, initialValue)` | Gộp mảng thành một giá trị như tổng hoặc object. |
| `find` | Tìm phần tử đầu tiên thỏa điều kiện. |
| `some` / `every` | Kiểm tra có một / tất cả phần tử thỏa điều kiện. |
| `sort` | Sắp xếp mảng; cần clone trước nếu không muốn sửa mảng gốc. |

Các method có thể chain:

```js
products.filter(...).map(...);
```

### Destructuring, spread và rest

```js
const { title, price } = product;
const [first, ...rest] = products;
const discountedProduct = { ...product, discounted: true };
const clonedProducts = [...products];
```

Spread (`...`) dùng để clone hoặc gộp object/mảng. Rest (`...`) dùng để gom phần còn lại của mảng hoặc tham số hàm.

### Arrow function và `this`

Arrow function ngắn gọn và không có `this` riêng; nó kế thừa `this` từ scope bao ngoài. Điều này hữu ích trong callback và event handler.

`this` phụ thuộc vào cách gọi hàm, không phụ thuộc nơi hàm được định nghĩa. Đây là điểm dễ vấp với người quen Java/C#.

### ES modules

Tách code qua `export` và `import`, sau đó nạp entry point bằng:

```html
<script type="module" src="./js/main.js"></script>
```

## Lab thực hành

1. **Array methods:** với mảng object sản phẩm gồm `id`, `title`, `price`, `category`, `rating`, hãy:
   - Dùng `map` lấy danh sách tên.
   - Dùng `filter` lọc theo giá hoặc category.
   - Dùng `reduce` tính tổng giá trị giỏ.
   - Dùng `sort` tăng/giảm theo giá.
   - Dùng `find` tìm theo `id`.
   - Viết lại một vòng `for` cũ thành chuỗi `filter().map()`.
2. **Destructuring, spread và rest:** tách `{ title, price }` từ product, tách `[first, ...rest]` từ mảng, gộp `{ ...product, discounted: true }`, clone an toàn bằng `[...items]`, và viết hàm có default parameter + rest parameter.
3. **`this` và arrow function:** tạo object có method thường và method arrow; gọi trực tiếp, gán method sang biến rồi gọi, và gọi trong `setTimeout` để quan sát `this` thay đổi.
4. **Module:** tách code ra nhiều file bằng `export`/`import`, rồi nạp qua `<script type="module">`.

## Đóng góp vào ShopLite

1. Tạo `v2-js/` bằng cách copy HTML/CSS từ `v1-html/`.
2. Tạo `data.js` chứa khoảng 8–12 sản phẩm mẫu theo cấu trúc DummyJSON: `id`, `title`, `price`, `thumbnail`, `category`, `rating`. Export mảng này để dùng làm nguồn dữ liệu giả cho Day 2, trước khi chuyển sang API thật ở Day 3.
3. Tạo các pure function để tái sử dụng:

   ```js
   filterByKeyword(list, query);
   sortByPrice(list, direction);
   ```

## Tiêu chí hoàn thành

- Viết được chuỗi `products.filter(...).map(...)` trơn tru, không cần tra cú pháp.
- Giải thích được vì sao arrow function hữu ích trong callback liên quan đến `this`.
- `data.js` export đúng và import được từ module khác mà không gặp lỗi CORS/module trong Console.
