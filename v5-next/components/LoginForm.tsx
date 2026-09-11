"use client";

import { loginSchema, type LoginValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  callbackUrl: string;
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginValues>({
    defaultValues: { username: "emilys", password: "emilyspass" },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginValues) {
    setSubmitError("");

    const result = await signIn("credentials", {
      ...values,
      callbackUrl,
      redirect: false,
    });

    if (result?.error) {
      setSubmitError("Tên đăng nhập hoặc mật khẩu không đúng.");
      return;
    }

    router.replace(callbackUrl);
    router.refresh();
  }

  return (
    <form
      className="mt-6 space-y-5"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldError error={errors.username?.message}>
        <label
          className="block text-sm font-semibold text-slate-700"
          htmlFor="username"
        >
          Tên đăng nhập
        </label>
        <input
          autoComplete="username"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
          id="username"
          {...register("username")}
        />
      </FieldError>

      <FieldError error={errors.password?.message}>
        <label
          className="block text-sm font-semibold text-slate-700"
          htmlFor="password"
        >
          Mật khẩu
        </label>
        <input
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
          id="password"
          type="password"
          {...register("password")}
        />
      </FieldError>

      {submitError && (
        <p aria-live="polite" className="text-sm font-medium text-red-700">
          {submitError}
        </p>
      )}

      <button
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}

function FieldError({
  children,
  error,
}: {
  children: React.ReactNode;
  error: string | undefined;
}) {
  return (
    <div>
      {children}
      {error && (
        <p aria-live="polite" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
