import "./style.css";

import { getProducts } from "./api";
import { addToCart, getCartItemCount } from "./cart";
import { getRequiredElement } from "./dom";
import { filterByKeyword } from "./product-utils";
import type { FetchState, Product } from "./types";

const productListElement = getRequiredElement<HTMLDivElement>("#product-list");
const searchFormElement = getRequiredElement<HTMLFormElement>(".search-form");
const searchInputElement = getRequiredElement<HTMLInputElement>("#search");
const emptyStateElement = getRequiredElement<HTMLParagraphElement>("#empty-state");
const productStatusElement = getRequiredElement<HTMLParagraphElement>("#product-status");
const cartBadgeElement = getRequiredElement<HTMLSpanElement>(".cart-badge");

let products: Product[] = [];
let productState: FetchState<Product[]> = { status: "idle" };

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function productCardHTML(product: Product): string {
  const { id, title, price, thumbnail, category, rating } = product;

  return `
    <article class="product-card" data-id="${id}">
      <img src="${thumbnail}" alt="${title}" />
      <h2><a href="product.html?id=${id}">${title}</a></h2>
      <p class="product-description">${category} · ⭐ ${rating}</p>
      <p class="product-price">${formatPrice(price)}</p>
      <button class="add-to-cart-button" type="button">Thêm vào giỏ</button>
    </article>
  `;
}

function renderProducts(list: Product[]): void {
  productListElement.innerHTML = list.map(productCardHTML).join("");
  emptyStateElement.hidden = list.length > 0;
}

function renderCartBadge(): void {
  cartBadgeElement.textContent = String(getCartItemCount());
}

function showLoading(): void {
  productState = { status: "loading" };
  productListElement.innerHTML = "";
  emptyStateElement.hidden = true;
  productStatusElement.dataset.state = productState.status;
  productStatusElement.textContent = "Đang tải sản phẩm...";
}

function showError(error: unknown): void {
  const message = error instanceof Error ? error.message : "Lỗi không xác định";

  productState = { status: "error", error: message };
  productListElement.innerHTML = "";
  emptyStateElement.hidden = true;
  productStatusElement.dataset.state = productState.status;
  productStatusElement.textContent = "Không thể tải sản phẩm. Vui lòng thử lại.";
}

async function initialize(): Promise<void> {
  showLoading();
  searchInputElement.disabled = true;

  try {
    products = await getProducts();
    productState = { status: "success", data: products };
    productStatusElement.textContent = "";
    productStatusElement.dataset.state = "";
    renderProducts(products);
  } catch (error: unknown) {
    console.error("Không thể tải products:", error);
    showError(error);
  } finally {
    searchInputElement.disabled = false;
  }
}

searchFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

searchInputElement.addEventListener("input", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  renderProducts(filterByKeyword(products, target.value));
});

productListElement.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const addButton = target.closest<HTMLButtonElement>(".add-to-cart-button");

  if (!addButton) {
    return;
  }

  const productCard = addButton.closest<HTMLElement>("[data-id]");
  const productId = Number(productCard?.dataset.id);
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  addToCart(selectedProduct);
  renderCartBadge();
});

renderCartBadge();
void initialize();
