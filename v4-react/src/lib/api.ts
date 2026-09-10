import type { Product } from "../types";

const API_BASE_URL = "https://dummyjson.com";

type ProductsResponse = {
  products: Product[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.price === "number" &&
    typeof value.discountPercentage === "number" &&
    typeof value.rating === "number" &&
    typeof value.stock === "number" &&
    typeof value.category === "string" &&
    typeof value.thumbnail === "string" &&
    isStringArray(value.images)
  );
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.products) &&
    value.products.every(isProduct)
  );
}

async function getJSON<T>(
  path: string,
  isExpectedData: (value: unknown) => value is T,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isExpectedData(data)) {
    throw new Error("API trả về dữ liệu không đúng cấu trúc mong đợi.");
  }

  return data;
}

export async function getProducts(): Promise<Product[]> {
  const data = await getJSON("/products?limit=20", isProductsResponse);

  return data.products;
}

export function getProduct(productId: number): Promise<Product> {
  return getJSON(`/products/${productId}`, isProduct);
}
