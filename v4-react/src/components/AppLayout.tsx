import { Outlet } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Header } from "./Header";

export function AppLayout() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "flex min-h-screen flex-col bg-slate-950 text-slate-100" : "flex min-h-screen flex-col bg-slate-50 text-slate-800"}>
      <Header />
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-slate-500 sm:px-6">© 2026 ShopLite · React Router & Zustand</div>
      </footer>
    </div>
  );
}
