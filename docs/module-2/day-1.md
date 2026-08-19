Ngày 1 JS hiện đại (ES6+) cho người đã biết lập trình

📖 Lý thuyết cơ bản
Khai báo biến: const (không gán lại) là mặc định, let khi cần gán lại. Bỏ qua var (scope kỳ lạ). Cả hai có block scope.

Array methods (cốt lõi của JS hiện đại): thay vì vòng for, dùng hàm trả về mảng mới (bất biến):

- map(fn) → biến đổi từng phần tử, trả mảng cùng độ dài.
- filter(fn) → giữ phần tử thỏa điều kiện.
- reduce(fn, init) → gộp mảng thành một giá trị (tổng, object...).
- find, some, every, sort. Các method này chainable: arr.filter(...).map(...).

Destructuring: tách nhanh const { title, price } = product; hoặc const [first, ...rest] = arr;. Spread/rest ...: clone/gộp {...a, ...b}, [...arr1, ...arr2], hoặc gom tham số.

Arrow function vs function thường: arrow () => {} ngắn gọn và không có this riêng (kế thừa this từ scope bao ngoài) — đây là khác biệt quan trọng. Trong callback/event, arrow giúp tránh lỗi this kinh điển.

this: giá trị của this phụ thuộc cách gọi hàm, không phải nơi định nghĩa. Với người từ Java/C#, đây là điểm dễ vấp nhất.

Module: export/import để tách file (<script type="module"> trong HTML).

🧪 Lab — thực hành
Array methods: cho một mảng object sản phẩm (id, title, price, category, rating), thực hành: map lấy danh sách tên; filter lọc sản phẩm giá < X hoặc theo category; reduce tính tổng giá trị giỏ; sort theo giá tăng/giảm; find tìm theo id. Sau đó viết lại một vòng for cũ thành chuỗi filter().map() và cảm nhận sự khác biệt.

Destructuring + spread/rest: tách const { title, price } = product, tách mảng const [first, ...rest] = arr, gộp object { ...product, discounted: true }, clone mảng an toàn [...items], viết hàm có tham số mặc định + gom tham số bằng rest.

this & arrow function: tạo một object có method viết bằng function thường và một viết bằng arrow, gọi trong các ngữ cảnh khác nhau (gọi trực tiếp, gán biến rồi gọi, trong setTimeout) để thấy this đổi; rút ra khi nào nên dùng arrow.

Module: tách code ra nhiều file export/import, nạp bằng <script type="module">.

🛒 Đóng góp vào ShopLite
Tạo thư mục v2-js/, copy toàn bộ HTML/CSS từ v1-html sang làm điểm xuất phát.

Tạo data.js chứa một mảng ~8–12 sản phẩm mẫu (cấu trúc giống DummyJSON: id, title, price, thumbnail, category, rating) và export ra ngoài — đây là "nguồn dữ liệu giả" để ngày 2 render, trước khi chuyển sang API thật ở ngày 3.

Viết sẵn vài hàm thuần (pure function) thao tác trên mảng sản phẩm: filterByKeyword(list, q), sortByPrice(list, dir) — tách riêng để ngày sau tái dùng.

✅ Tiêu chí hoàn thành
Viết được chuỗi products.filter(...).map(...) trơn tru, không cần tra cú pháp.

Giải thích được vì sao arrow function tránh được lỗi this trong callback.

data.js export đúng và import được từ file khác qua ES module (không lỗi CORS/module trong console).