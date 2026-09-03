import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../lib/api";

export function useProduct(productId: number | null) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      if (productId === null) {
        throw new Error("Thiếu mã sản phẩm.");
      }

      return getProduct(productId);
    },
    enabled: productId !== null,
  });
}
