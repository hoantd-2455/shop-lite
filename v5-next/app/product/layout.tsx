export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-y border-blue-100 bg-blue-50/50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 text-sm font-medium text-blue-700 sm:px-6">
        Khu vực sản phẩm dùng layout riêng
      </div>
      {children}
    </div>
  );
}
