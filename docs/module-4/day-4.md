# Day 4 — Phân loại State, Context và Zustand

## Mục tiêu trong ngày

- Phân loại state theo bản chất trước khi chọn thư viện.
- Hiểu Context, `useReducer`, Zustand và Redux Toolkit phù hợp khi nào.
- Chuyển giỏ hàng thành global client store.
- Lưu giỏ hàng qua reload bằng persistence.

## Phân loại state

| Loại state      | Ví dụ                                    | Công cụ phù hợp                 |
| --------------- | ---------------------------------------- | ------------------------------- |
| Server state    | Sản phẩm, user, đơn hàng từ API          | TanStack Query, RTK Query, SWR  |
| URL state       | Filter, trang, tab, từ khóa search       | URL params, search params       |
| Client/UI state | Giỏ hàng, theme, modal, bước checkout    | Zustand, Redux Toolkit, Context |
| Form state      | Giá trị và lỗi form                      | React Hook Form + Zod           |
| Local state     | Input hoặc drawer chỉ một component dùng | `useState`, `useReducer`        |

## Cây quyết định

Khi gặp state mới, hỏi theo thứ tự và dừng ở câu đúng đầu tiên:

1. Data có đến từ server không? Dùng TanStack Query.
2. Data có nên chia sẻ qua URL không? Dùng URL params/search params.
3. Chỉ một component dùng? Giữ bằng `useState` tại chỗ.
4. Một vài component gần nhau dùng chung? Lift state up hoặc Context nhỏ.
5. Nhiều nơi xa nhau và logic phức tạp? Dùng Zustand hoặc Redux Toolkit.

Không đưa server state vào Redux chỉ để tự viết loading/cache/refetch. Dùng công cụ nhỏ nhất giải quyết vấn đề, không global hóa state quá sớm.

## Context và `useReducer`

Context giải quyết prop drilling: Provider cung cấp value cho cây component, consumer đọc bằng `useContext` mà không phải truyền qua mọi tầng.

Context phù hợp với state nhỏ, ít thay đổi như theme, locale hoặc user đơn giản. Với list action phức tạp, `useReducer` giúp mô hình hóa luồng `dispatch(action) → reducer → state mới`.

## Zustand và Redux Toolkit

### Zustand

Zustand là store hook nhỏ gọn, không cần Provider riêng. Component đọc đúng phần state cần thiết qua selector.

```ts
const items = useCartStore((state) => state.items);
```

Middleware `persist` lưu state vào `localStorage`, nên giỏ vẫn còn sau reload.

### Redux Toolkit

Redux Toolkit phù hợp app lớn, state phức tạp, team đông hoặc khi codebase đã dùng Redux. `configureStore`, `createSlice`, `useSelector` và `dispatch` tạo cấu trúc chặt hơn; Redux DevTools hỗ trợ theo dõi action và time-travel debugging.

RTK Query là lựa chọn server state trong hệ Redux. ShopLite đã dùng TanStack Query, vì vậy không cần dùng cả hai cho cùng dữ liệu sản phẩm.

## Lab

1. Liệt kê state ShopLite và phân loại bằng cây quyết định.
2. Tạo `ThemeContext` light/dark để thực hành Context.
3. Viết reducer cho list nhỏ để hiểu action/reducer.
4. Cài Zustand, tạo store có items và các action giỏ hàng.
5. Thêm `persist`, reload app để kiểm tra localStorage hydrate lại state.
6. Đọc khái niệm Redux Toolkit và RTK Query; không cần dựng cả hai store cho cùng giỏ hàng.

## Áp dụng vào ShopLite

- `ThemeContext` quản lý light/dark, minh họa Context cho state nhỏ.
- `useCartStore` là nguồn sự thật duy nhất của giỏ hàng.
- Store có `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart` và `persist` key `shoplite-react-cart`.
- `ProductCard` và `ProductDetail` gọi `addToCart` trực tiếp từ store.
- `Header` đọc tổng quantity/tổng tiền; `CartDrawer` đọc và cập nhật item qua selector.
- Sản phẩm vẫn là server state trong TanStack Query; search và panel detail vẫn là local state, sau này có thể chuyển search sang URL state.

## Hoàn thành khi

- Phân loại đúng state và giải thích được lý do chọn công cụ.
- Giỏ hàng không còn prop drilling, cập nhật badge/tổng tiền theo thời gian thực.
- Có thể đổi quantity, xóa item, clear giỏ và giữ giỏ qua reload.
- Giải thích được khi nào chọn Context, Zustand hoặc Redux Toolkit.
