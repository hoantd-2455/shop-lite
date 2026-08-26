import "./style.css";

import { getProductById } from "./api";
import { addToCart, getCartItemCount } from "./cart";
import { getRequiredElement } from "./dom";
import type { Product } from "./types";

const productDetailElement = getRequiredElement<HTMLElement>("#product-detail");
const productStatusElement = getRequiredElement<HTMLParagraphElement>("#product-status");
const cartBadgeElement = getRequiredElement<HTMLSpanElement>(".cart-badge");

let currentProduct: Product | null = null;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatCategory(category: string): string {
  return category.replaceAll("-", " ");
}

function renderCartBadge(): void {
  cartBadgeElement.textContent = String(getCartItemCount());
}

function showLoading(): void {
  productDetailElement.hidden = true;
  productStatusElement.dataset.state = "loading";
  productStatusElement.textContent = "Đang tải thông tin sản phẩm...";
}

function showError(message: string): void {
  productDetailElement.hidden = true;
  productStatusElement.dataset.state = "error";
  productStatusElement.textContent = message;
}

function renderProduct(product: Product): void {
  const { id, title, price, thumbnail, category, rating, description, stock } = product;

  productDetailElement.innerHTML = `
    <img class="product-detail-image" src="${thumbnail}" alt="${title}" />
    <div>
      <p class="product-category">${formatCategory(category)}</p>
      <h1>${title}</h1>
      <p class="product-detail-price">${formatPrice(price)}</p>
      <p class="product-detail-description">${description}</p>
      <dl class="product-meta">
        <dt>Tình trạng</dt><dd>${stock > 0 ? `Còn ${stock} sản phẩm` : "Hết hàng"}</dd>
        <dt>Đánh giá</dt><dd>${rating} / 5</dd>
      </dl>
      <button class="add-to-cart-button" data-id="${id}" type="button">Thêm vào giỏ</button>
    </div>
  `;

  document.title = `ShopLite | ${title}`;
  productStatusElement.textContent = "";
  productStatusElement.dataset.state = "";
  productDetailElement.hidden = false;
}

async function initialize(): Promise<void> {
  const productId = Number(new URLSearchParams(window.location.search).get("id"));

  if (!Number.isInteger(productId) || productId <= 0) {
    showError("Không tìm thấy mã sản phẩm hợp lệ.");
    return;
  }

  showLoading();

  try {
    currentProduct = await getProductById(productId);
    renderProduct(currentProduct);
  } catch (error: unknown) {
    console.error("Không thể tải sản phẩm:", error);
    showError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
  }
}

productDetailElement.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element) || !target.closest(".add-to-cart-button") || !currentProduct) {
    return;
  }

  addToCart(currentProduct);
  renderCartBadge();
});

renderCartBadge();
void initialize();
