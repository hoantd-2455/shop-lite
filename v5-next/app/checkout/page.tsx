import { auth } from "@/auth";
import { CheckoutForm } from "@/components/CheckoutForm";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  // Proxy redirect sớm; kiểm tra này vẫn bắt buộc trước khi render dữ liệu nhạy cảm.
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
        React Hook Form + Zod
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Thanh toán</h1>
      <p className="mt-3 leading-7 text-slate-600">
        Thông tin được kiểm tra ở trình duyệt để phản hồi nhanh và được kiểm tra
        lại tại API trước khi tạo đơn.
      </p>
      <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <CheckoutForm
          defaultEmail={session.user.email ?? ""}
          defaultFullName={session.user.name ?? ""}
        />
      </div>
    </section>
  );
}
