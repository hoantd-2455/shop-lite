import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { products } from "./data";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header cartCount={0} />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          React · Day 1
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Sản phẩm mới nhất
        </h1>
        <p className="mt-3 text-slate-600">
          Dữ liệu đang được render bằng component, props và JSX.
        </p>

        <ProductList products={products} />
      </main>
    </div>
  );
}

export default App;
