interface OrderItem {
  productId: number;
  quantity: number;
}

function isValidOrderItem(value: unknown): value is OrderItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.productId === "number" &&
    Number.isSafeInteger(item.productId) &&
    item.productId > 0 &&
    typeof item.quantity === "number" &&
    Number.isSafeInteger(item.quantity) &&
    item.quantity > 0
  );
}

// Route Handler: endpoint GET độc lập với UI page.tsx.
export function GET() {
  return Response.json({
    message: "Gửi POST /api/orders với items để tạo đơn hàng mô phỏng.",
  });
}

// Route Handler: nhận JSON từ client và trả về mã đơn hàng mock.
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Body phải là JSON hợp lệ." },
      { status: 400 },
    );
  }

  const items =
    typeof body === "object" && body !== null && "items" in body
      ? body.items
      : undefined;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    !items.every(isValidOrderItem)
  ) {
    return Response.json(
      { message: "items phải là mảng gồm productId và quantity dương." },
      { status: 400 },
    );
  }

  const orderCode = `SL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  console.info(
    `[api] Tạo đơn hàng mock ${orderCode} với ${items.length} dòng.`,
  );

  return Response.json(
    {
      orderCode,
      status: "received",
      itemCount: items.length,
      message: "Đơn hàng mô phỏng đã được ghi nhận.",
    },
    { status: 201 },
  );
}
