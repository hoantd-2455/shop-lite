import { LoginForm } from "@/components/LoginForm";

function getSafeCallbackUrl(callbackUrl: string | undefined) {
  if (!callbackUrl) {
    return "/";
  }

  try {
    // Chỉ lấy path nội bộ. Dù callbackUrl bị thay thành URL ngoài, ta không redirect ra ngoài.
    const url = new URL(callbackUrl, "http://shoplite.local");
    return `${url.pathname}${url.search}`;
  } catch {
    return "/";
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Auth.js · Credentials
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Đăng nhập</h1>
        <p className="mt-4 leading-7 text-slate-600">
          Dùng tài khoản thử của DummyJSON: <strong>emilys</strong> /{" "}
          <strong>emilyspass</strong>. Sau khi xác thực, Auth.js tạo session JWT
          trong cookie bảo mật.
        </p>
        <LoginForm callbackUrl={safeCallbackUrl} />
      </div>
    </section>
  );
}
