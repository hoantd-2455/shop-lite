import type { Product, SortDir } from "./types";

/** Generic giữ nguyên type của giá trị được truyền vào. */
export function identity<T>(value: T): T {
  return value;
}

/** Generic biết chính xác kiểu phần tử của mảng, kể cả khi mảng rỗng. */
export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function filterByKeyword(products: Product[], keyword = ""): Product[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return products;
  }

  return products.filter(({ title, category }) => {
    return (
      title.toLowerCase().includes(normalizedKeyword) ||
      category.toLowerCase().includes(normalizedKeyword)
    );
  });
}

export function sortByPrice(
  products: Product[],
  direction: SortDir = "asc",
): Product[] {
  const multiplier = direction === "desc" ? -1 : 1;

  return [...products].sort((firstProduct, secondProduct) => {
    return (firstProduct.price - secondProduct.price) * multiplier;
  });
}
