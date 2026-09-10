"use client";

import { useRouter } from "next/navigation";

interface DemoLoginButtonProps {
  redirectTo: string;
}

// Chỉ phục vụ bài học: browser ghi cookie giả rồi điều hướng lại route ban đầu.
export function DemoLoginButton({ redirectTo }: DemoLoginButtonProps) {
  const router = useRouter();

  function handleLogin() {
    document.cookie =
      "shoplite-demo-auth=true; Path=/; Max-Age=3600; SameSite=Lax";
    router.replace(redirectTo);
  }

  return (
    <button
      className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      onClick={handleLogin}
      type="button"
    >
      Đăng nhập demo
    </button>
  );
}
