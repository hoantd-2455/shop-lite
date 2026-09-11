import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(3, "Tên đăng nhập cần có ít nhất 3 ký tự."),
  password: z.string().min(6, "Mật khẩu cần có ít nhất 6 ký tự."),
});

export const checkoutFormSchema = z.object({
  fullName: z.string().trim().min(2, "Họ tên cần có ít nhất 2 ký tự."),
  email: z.email("Email chưa đúng định dạng.").trim(),
  address: z.string().trim().min(10, "Địa chỉ cần có ít nhất 10 ký tự."),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại Việt Nam chưa hợp lệ."),
});

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

// Schema này dùng lại trong cả CheckoutForm (client) lẫn Route Handler (server).
export const createOrderSchema = checkoutFormSchema.extend({
  items: z.array(orderItemSchema).min(1, "Giỏ hàng đang trống."),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
