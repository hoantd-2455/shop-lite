# Day 1 — Component, JSX và Props

## Mục tiêu trong ngày

- Hiểu React mô tả UI theo dữ liệu thay vì thao tác DOM trực tiếp.
- Tạo component, viết JSX và truyền props có type.
- Render list có `key` ổn định và conditional rendering.
- Thiết lập React TypeScript với Vite và Tailwind CSS.

## Kiến thức trọng tâm

### React và component

React xây UI bằng cách ghép các component. Một component là function trả về JSX, tên phải viết hoa chữ cái đầu để React nhận diện nó là component.

```tsx
function ProductCard() {
  return <article>Sản phẩm</article>;
}
```

Thay vì `querySelector()` và gán `innerHTML`, component mô tả UI nên trông thế nào theo dữ liệu. React chịu trách nhiệm đồng bộ DOM khi dữ liệu thay đổi.

### JSX

JSX là cú pháp giống HTML trong TypeScript.

- Dùng `className` thay cho `class`.
- Dùng `{expression}` để nhúng biểu thức JavaScript.
- Mọi thẻ phải đóng.
- Component trả về một node gốc hoặc fragment `<>...</>`.

### Props và luồng dữ liệu một chiều

Props là dữ liệu cha truyền xuống con và không được sửa trực tiếp.

```tsx
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return <h2>{product.title}</h2>;
}
```

### Render list, `key` và điều kiện

```tsx
{
  products.map((product) => <ProductCard key={product.id} product={product} />);
}
```

`key` phải là định danh ổn định như `product.id`. Không dùng index nếu danh sách có thể thêm, xóa hoặc sắp xếp lại; React có thể gắn nhầm state/UI vào item khác.

Conditional rendering dùng `&&` hoặc ternary:

```tsx
{
  isOutOfStock ? <span>Hết hàng</span> : <span>Còn hàng</span>;
}
```

### Tailwind trong React

Tailwind được cài qua Vite và class đặt trực tiếp ở `className`. Utility không có tiền tố áp dụng cho mobile; `md:` và `lg:` ghi đè từ tablet và desktop.

## Lab

1. Tạo Vite template `react-ts`, cài Tailwind và chạy `npm run dev`.
2. Viết component JSX đầu tiên, thử `className` và biểu thức trong `{}`.
3. Tạo `ProductCardProps`, render card từ mảng dữ liệu bằng `.map()`.
4. Dùng `product.id` làm `key`.
5. Hiển thị badge và disable nút theo `stock` bằng conditional rendering.

## Áp dụng vào ShopLite

- Tạo `v4-react/` bằng Vite React TypeScript + Tailwind.
- Mang `Product` và `CartItem` sang `src/types.ts`.
- Tạo `Header`, `ProductList` và `ProductCard`.
- Dùng `data.ts` hardcode để tập trung vào component, JSX và props.
- Dùng lưới responsive: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.

## Hoàn thành khi

- Lưới `ProductCard` render được từ mảng và không có cảnh báo key.
- Props có type TypeScript rõ ràng.
- UI responsive ở mobile, tablet và desktop.
- Giải thích được vì sao không dùng index làm key cho danh sách thay đổi.
