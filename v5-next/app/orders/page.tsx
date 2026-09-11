import { auth } from "@/auth";
import { redirect } from "next/navigation";

const mockOrders = [
  { code: "SL-DEMO-1001", status: "Đã giao", total: 980_000 },
  { code: "SL-DEMO-1002", status: "Đang xử lý", total: 450_000 },
];

function getCreatedOrderCode(orderCode: string | undefined) {
  return orderCode?.startsWith("SL-") ? orderCode : undefined;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  // Proxy redirect sớm; page vẫn tự kiểm tra session trước khi trả nội dung đơn hàng.
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const { created } = await searchParams;
  const createdOrderCode = getCreatedOrderCode(created);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
        Server session
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Đơn hàng của {session.user.name}
      </h1>

      {createdOrderCode && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
          <p className="font-bold">Đặt hàng thành công</p>
          <p className="mt-1 text-sm text-emerald-800">
            Mã đơn mới của bạn là <strong>{createdOrderCode}</strong>.
          </p>
        </div>
      )}

      <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-semibold">Mã đơn</th>
              <th className="px-5 py-3 font-semibold">Trạng thái</th>
              <th className="px-5 py-3 text-right font-semibold">Tổng tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockOrders.map((order) => (
              <tr key={order.code}>
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {order.code}
                </td>
                <td className="px-5 py-4 text-slate-600">{order.status}</td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">
                  {order.total.toLocaleString("vi-VN")} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
