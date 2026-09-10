import { DemoLoginButton } from "@/components/DemoLoginButton";

function getSafeRedirect(next: string | undefined) {
  if (next?.startsWith("/") && !next.startsWith("//")) {
    return next;
  }

  return "/";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = getSafeRedirect(next);

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Day 3 demo
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Đăng nhập</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Nút này chỉ ghi cookie giả trong trình duyệt để kiểm tra redirect của
          route bảo vệ. Nó không thay thế xác thực thật.
        </p>
        <div className="mt-6">
          <DemoLoginButton redirectTo={redirectTo} />
        </div>
      </div>
    </section>
  );
}
