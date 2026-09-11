import { auth } from "@/auth";
import { createOrderSchema } from "@/lib/schemas";

// Route Handler: endpoint GET độc lập với UI page.tsx.
export function GET() {
  return Response.json({
    message: "Gửi POST /api/orders với items để tạo đơn hàng mô phỏng.",
  });
}

// Route Handler: nhận JSON từ client và trả về mã đơn hàng mock.
export async function POST(request: Request) {
  // Route Handler cũng cần tự xác thực. Proxy không bảo vệ API này.
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ message: "Bạn cần đăng nhập." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Body phải là JSON hợp lệ." },
      { status: 400 },
    );
  }

  const parsedOrder = createOrderSchema.safeParse(body);

  if (!parsedOrder.success) {
    return Response.json(
      {
        message: "Dữ liệu đơn hàng chưa hợp lệ.",
        errors: parsedOrder.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const orderCode = `SL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  console.info(
    `[api] Tạo đơn hàng mock ${orderCode} cho user ${session.user.id} với ${parsedOrder.data.items.length} dòng.`,
  );

  return Response.json(
    {
      orderCode,
      status: "received",
      itemCount: parsedOrder.data.items.length,
      message: "Đơn hàng mô phỏng đã được ghi nhận.",
    },
    { status: 201 },
  );
}
