import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/loginSchema";

const inputClassName =
  "mt-1 w-full rounded-lg border px-3 py-2.5 outline-none transition focus:ring-3";

export function LoginForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  function handleValidSubmit(values: LoginFormValues) {
    setSubmittedEmail(values.email);
  }

  return (
    <form
      className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      noValidate
      onSubmit={handleSubmit(handleValidSubmit)}
    >
      <div>
        <label className="text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          className={`${inputClassName} ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
          id="email"
          placeholder="you@example.com"
          type="email"
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold" htmlFor="password">
          Mật khẩu
        </label>
        <input
          {...register("password")}
          aria-invalid={Boolean(errors.password)}
          autoComplete="current-password"
          className={`${inputClassName} ${
            errors.password
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
          id="password"
          placeholder="Tối thiểu 8 ký tự"
          type="password"
        />
        {errors.password?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Đang kiểm tra..." : "Đăng nhập"}
      </button>

      {submittedEmail && (
        <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          Dữ liệu hợp lệ. Sẵn sàng đăng nhập với {submittedEmail}.
        </p>
      )}
    </form>
  );
}
