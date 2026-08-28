# Day 2 — State, Event và `useState`

## Mục tiêu trong ngày

- Phân biệt state với props.
- Cập nhật state theo cách bất biến.
- Xử lý event và controlled input.
- Lift state lên component cha khi nhiều component cần chung dữ liệu.
- Dùng React Hook Form và Zod để validate form.

## Kiến thức trọng tâm

### State và `useState`

State là dữ liệu thay đổi theo thời gian và khiến React render lại UI. Props do component cha truyền xuống và chỉ đọc; state thuộc về component sở hữu nó.

```tsx
const [count, setCount] = useState(0);
```

Không sửa trực tiếp state:

```ts
// Sai: items.push(newItem)
setItems((items) => [...items, newItem]);
```

Khi cập nhật dựa trên state cũ, dùng functional updater như `setCount((count) => count + 1)`.

### Event và controlled component

Event React dùng camelCase và nhận function, không gọi function ngay trong JSX.

```tsx
<button onClick={handleClick}>Thêm</button>
```

Controlled input lấy `value` từ state và cập nhật qua `onChange`. React là nguồn sự thật của giá trị input.

```tsx
<input value={query} onChange={(event) => setQuery(event.target.value)} />
```

### Lift state up và derived state

Nếu hai component cần chung một dữ liệu, đặt state ở component cha chung. Con nhận value qua props và báo thay đổi bằng callback.

Không lưu derived state nếu có thể tính từ state hiện có. Ví dụ `filteredProducts` được tính từ `products` và `searchQuery`, không cần thêm `useState`.

### React Hook Form và Zod

- React Hook Form (RHF) đăng ký field qua `register`, xử lý submit qua `handleSubmit` và cung cấp lỗi trong `formState.errors`.
- Zod mô tả schema validation và suy ra type bằng `z.infer`.
- `zodResolver` kết nối schema Zod với RHF, tạo một nguồn sự thật cho rule và type.

## Lab

1. Làm counter/toggle và cập nhật mảng hoặc object theo cách bất biến.
2. Truyền callback từ cha xuống con rồi gọi callback trong `onClick`.
3. Tạo controlled search input.
4. Lift `searchQuery` lên cha, lọc danh sách và render empty state.
5. Cài `react-hook-form`, `zod`, `@hookform/resolvers`; tạo form email/mật khẩu có lỗi từng field.

## Áp dụng vào ShopLite

- `App` sở hữu `searchQuery` và `cartItems`.
- `SearchBar` nhận `value` và `onValueChange`; danh sách lọc theo thời gian thực.
- `ProductCard` gọi `onAddToCart(product)`; `App` cập nhật `cartItems` bằng mảng mới.
- Badge trong `Header` nhận tổng quantity từ props.
- `LoginForm` dùng RHF + Zod; `loginSchema` được tách vào `src/schemas/` để tái sử dụng.

## Hoàn thành khi

- Tìm kiếm đi theo luồng state ở cha, event từ con.
- Giỏ hàng cập nhật bất biến, không mutate mảng cũ.
- Form chặn dữ liệu sai, hiển thị lỗi email/mật khẩu và chỉ báo thành công khi hợp lệ.
- `npm run build` và `npm run lint` không có lỗi.
