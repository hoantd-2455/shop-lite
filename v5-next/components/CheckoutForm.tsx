"use client";

import { checkoutFormSchema, type CheckoutFormValues } from "@/lib/schemas";
import { useCartStore } from "@/store/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CheckoutFormProps {
  defaultEmail: string;
  defaultFullName: string;
}

export function CheckoutForm({
  defaultEmail,
  defaultFullName,
}: CheckoutFormProps) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [submitError, setSubmitError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      address: "",
      email: defaultEmail,
      fullName: defaultFullName,
      phone: "",
    },
    resolver: zodResolver(checkoutFormSchema),
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function onSubmit(values: CheckoutFormValues) {
    if (items.length === 0) {
      setSubmitError("Giỏ hàng đang trống. Hãy quay lại chọn sản phẩm.");
      return;
    }

    setSubmitError("");

    try {
      const response = await fetch("/api/orders", {
        body: JSON.stringify({
          ...values,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data: unknown = await response.json();

      if (
        !response.ok ||
        typeof data !== "object" ||
        data === null ||
        !("orderCode" in data)
      ) {
        setSubmitError("Không thể tạo đơn hàng. Hãy thử lại.");
        return;
      }

      clearCart();
      router.replace(
        `/orders?created=${encodeURIComponent(String(data.orderCode))}`,
      );
    } catch {
      setSubmitError("Lỗi mạng. Hãy kiểm tra kết nối rồi thử lại.");
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
      <CheckoutField
        error={errors.fullName?.message}
        label="Họ và tên"
        name="fullName"
        register={register}
      />
      <CheckoutField
        error={errors.email?.message}
        label="Email"
        name="email"
        register={register}
        type="email"
      />
      <CheckoutField
        error={errors.phone?.message}
        label="Số điện thoại"
        name="phone"
        register={register}
        type="tel"
      />
      <CheckoutField
        error={errors.address?.message}
        label="Địa chỉ nhận hàng"
        name="address"
        register={register}
      />

      {submitError && (
        <p
          aria-live="polite"
          className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800"
        >
          {submitError}
        </p>
      )}

      <button
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-slate-400"
        disabled={isSubmitting || items.length === 0}
        type="submit"
      >
        {isSubmitting
          ? "Đang đặt hàng..."
          : `Đặt hàng · ${total.toLocaleString("vi-VN")} ₫`}
      </button>
    </form>
  );
}

function CheckoutField({
  error,
  label,
  name,
  register,
  type = "text",
}: {
  error: string | undefined;
  label: string;
  name: keyof CheckoutFormValues;
  register: ReturnType<typeof useForm<CheckoutFormValues>>["register"];
  type?: "email" | "tel" | "text";
}) {
  return (
    <div>
      <label
        className="block text-sm font-semibold text-slate-700"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
        id={name}
        type={type}
        {...register(name)}
      />
      {error && (
        <p aria-live="polite" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
