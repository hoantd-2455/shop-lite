"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthControls() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-24 animate-pulse rounded bg-slate-100" />;
  }

  if (!session?.user) {
    return (
      <Link
        className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        href="/login"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="hidden max-w-32 truncate font-medium text-slate-700 lg:block">
        {session.user.name}
      </span>
      <button
        className="font-semibold text-slate-600 transition hover:text-red-700"
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
      >
        Đăng xuất
      </button>
    </div>
  );
}
