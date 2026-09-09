import "server-only";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
}

type ProductsResponse = {
  products: Product[];
};

const PRODUCTS_URL =
  "https://dummyjson.com/products?limit=12&select=id,title,description,price,rating,stock,category,thumbnail";

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;

  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    typeof product.rating === "number" &&
    typeof product.stock === "number" &&
    typeof product.category === "string" &&
    typeof product.thumbnail === "string"
  );
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "products" in value &&
    Array.isArray(value.products) &&
    value.products.every(isProduct)
  );
}

// Chạy ở server. revalidate: 60 tạo cache dữ liệu tối đa 60 giây.
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Không tải được sản phẩm: HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isProductsResponse(data)) {
    throw new Error("Dữ liệu sản phẩm không đúng cấu trúc mong đợi.");
  }

  return data.products;
}
