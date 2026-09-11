"use client";

import { CartStoreProvider } from "@/store/cartStore";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

// Layout vẫn là Server Component; Context/hook được giữ trong Client Provider này.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartStoreProvider>{children}</CartStoreProvider>
    </SessionProvider>
  );
}
