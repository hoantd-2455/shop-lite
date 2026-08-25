import "./style.css";
import type { FetchState, Product, SortDir } from "./types";

const sampleProducts: Product[] = [
  {
    id: 1,
    title: "Tai nghe không dây AirSound",
    description: "Tai nghe nhỏ gọn cho nhu cầu hằng ngày.",
    price: 1200000,
    discountPercentage: 10,
    rating: 4.6,
    stock: 24,
    category: "audio",
    thumbnail: "https://placehold.co/640x480/e5e7eb/64748b?text=Product+1",
    images: [],
  },
  {
    id: 2,
    title: "Bình giữ nhiệt Travel Mug",
    description: "Giữ nóng và lạnh hiệu quả.",
    price: 850000,
    discountPercentage: 5,
    rating: 4.8,
    stock: 12,
    category: "lifestyle",
    thumbnail: "https://placehold.co/640x480/e5e7eb/64748b?text=Product+2",
    images: [],
  },
];

const productState: FetchState<Product[]> = {
  status: "success",
  data: sampleProducts,
};

function sortProducts(products: Product[], direction: SortDir): Product[] {
  const multiplier = direction === "asc" ? 1 : -1;

  return [...products].sort((first, second) => {
    return (first.price - second.price) * multiplier;
  });
}

function getStatusMessage(state: FetchState<Product[]>): string {
  switch (state.status) {
    case "idle":
      return "Chưa gửi request nào.";
    case "loading":
      return "Đang tải sản phẩm...";
    case "error":
      return state.error ?? "Không thể tải sản phẩm.";
    case "success":
      return `Đã có ${state.data?.length ?? 0} sản phẩm mẫu.`;
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function productCardHTML(product: Product): string {
  return `
    <article class="product-card">
      <img src="${product.thumbnail}" alt="${product.title}" />
      <p class="product-category">${product.category}</p>
      <h2>${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
    </article>
  `;
}

const productList = sortProducts(sampleProducts, "asc");
const appElement = document.querySelector<HTMLDivElement>("#app");

if (!appElement) {
  throw new Error("Không tìm thấy phần tử #app.");
}

appElement.innerHTML = `
  <header class="site-header">
    <div class="container">
      <a class="logo" href="/">ShopLite</a>
      <span>Module 3 · TypeScript</span>
    </div>
  </header>

  <main class="container">
    <section class="product-section" aria-labelledby="products-heading">
      <p class="eyebrow">Day 1 · TypeScript foundations</p>
      <h1 id="products-heading">Sản phẩm</h1>
      <p class="status">${getStatusMessage(productState)}</p>
      <div class="product-list">
        ${productList.map(productCardHTML).join("")}
      </div>
    </section>

    <section class="type-notes" aria-labelledby="types-heading">
      <h2 id="types-heading">TypeScript đang bảo vệ gì?</h2>
      <ul>
        <li><code>sampleProducts</code> bắt buộc là mảng <code>Product</code>.</li>
        <li><code>"asc"</code> chỉ là một trong hai giá trị của <code>SortDir</code>.</li>
        <li><code>FetchState&lt;Product[]&gt;</code> mô tả trạng thái tải danh sách.</li>
      </ul>
    </section>
  </main>
`;
