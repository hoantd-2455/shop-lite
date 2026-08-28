import { useState } from "react";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { ProductList } from "./components/ProductList";
import { products } from "./data";
import type { CartItem, Product } from "./types";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
          React · Day 2
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Sản phẩm mới nhất
        </h1>
        <p className="mt-3 text-slate-600">
          Tìm kiếm và giỏ hàng đang được điều khiển bởi state ở App.
        </p>

        <ProductList
          onAddToCart={handleAddToCart}
          products={filteredProducts}
        />

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
    </div>
  );
}

export default App;
