import { useState } from "react";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { ProductDetail } from "./components/ProductDetail";
import { ProductList } from "./components/ProductList";
import type { CartItem, Product } from "./types";
import { useProducts } from "./hooks/useProducts";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { data: products = [], error, isError, isFetching, isPending, refetch } =
    useProducts();

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  });
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function handleAddToCart(product: Product) {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }

      return [
        ...currentCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header
        cartCount={cartCount}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          React · Day 3
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Sản phẩm mới nhất
        </h1>
        <p className="mt-3 text-slate-600">
          Sản phẩm là server state từ DummyJSON; giỏ hàng vẫn là client state.
        </p>

        {isPending ? (
          <ProductListSkeleton />
        ) : isError ? (
          <section className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
            <h2 className="font-bold">Không thể tải sản phẩm</h2>
            <p className="mt-1 text-sm">{error.message}</p>
            <button
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white transition hover:bg-red-800"
              onClick={() => refetch()}
              type="button"
            >
              Thử lại
            </button>
          </section>
        ) : (
          <>
            {isFetching && (
              <p className="mt-5 text-sm text-slate-500">Đang đồng bộ dữ liệu...</p>
            )}
            <ProductList
              onAddToCart={handleAddToCart}
              onViewProduct={setSelectedProductId}
              products={filteredProducts}
            />
          </>
        )}

        <section className="mt-16 border-t border-slate-200 pt-10" id="login">
          <div className="max-w-md">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              React Hook Form + Zod
            </p>
            <h2 className="mt-2 text-2xl font-bold">Đăng nhập thử</h2>
            <p className="mt-2 text-slate-600">
              Form này được validate bằng schema, chưa gửi dữ liệu tới server.
            </p>
            <LoginForm />
          </div>
        </section>
      </main>

      {selectedProductId && (
        <ProductDetail
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedProductId(null)}
          productId={selectedProductId}
        />
      )}
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
          key={index}
        >
          <div className="aspect-4/3 rounded-lg bg-slate-200" />
          <div className="mt-4 h-4 w-2/5 rounded bg-slate-200" />
          <div className="mt-3 h-5 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-200" />
          <div className="mt-5 h-10 rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default App;
