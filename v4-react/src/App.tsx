import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <p className="animate-pulse text-slate-500">Đang tải trang...</p>
    </div>
  );
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          element={
            <LazyPage>
              <HomePage />
            </LazyPage>
          }
          index
        />
        <Route
          element={
            <LazyPage>
              <ProductPage />
            </LazyPage>
          }
          path="product/:id"
        />
        <Route
          element={
            <LazyPage>
              <CartPage />
            </LazyPage>
          }
          path="cart"
        />
        <Route
          element={
            <LazyPage>
              <NotFoundPage />
            </LazyPage>
          }
          path="*"
        />
      </Route>
    </Routes>
  );
}

export default App;
