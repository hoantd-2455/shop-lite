# Module 4 — ReactJS

Module này tập trung vào tư duy component và hooks — phần khác biệt lớn nhất so với lập trình giao diện truyền thống. Học React cùng TypeScript ngay từ đầu.

## Mục tiêu

- Chia UI thành component, truyền props và lift state up.
- Hiểu dữ liệu chảy một chiều: props đi xuống, event/callback đi lên.
- Dùng `useState`, `useEffect`, `useContext` và viết custom hook.
- Render list với `key`, conditional rendering và form validation.
- Style component bằng Tailwind CSS với breakpoint `md:` và `lg:`.
- Dùng React Router, TanStack Query và lựa chọn công cụ state phù hợp.
- Tối ưu render với `React.memo`, `useMemo`, `useCallback` và lazy-load route.

## Phân loại state

| Loại state   | Ví dụ                            | Công cụ phù hợp                     |
| ------------ | -------------------------------- | ----------------------------------- |
| Server state | Danh sách sản phẩm từ API        | TanStack Query                      |
| URL state    | Từ khóa tìm kiếm, trang hiện tại | React Router URL params             |
| Client state | Giỏ hàng, theme                  | Context, Zustand hoặc Redux Toolkit |
| Form state   | Email, mật khẩu, lỗi validation  | React Hook Form + Zod               |
| Local state  | Input tạm thời, modal đang mở    | `useState`                          |

## Kết quả mong đợi

`v4-react/` là phiên bản ShopLite Single Page Application: component hóa, có routing, giỏ hàng global, form validation và dữ liệu API được quản lý theo đúng loại state.
