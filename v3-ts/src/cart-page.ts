import "./style.css";

import {
  getCartItemCount,
  getCartTotal,
  loadCart,
  removeFromCart,
  updateQuantity,
} from "./cart";
import { getRequiredElement } from "./dom";
import type { CartItem } from "./types";

const cartItemsElement = getRequiredElement<HTMLDivElement>("#cart-items");
const orderSummaryElement = getRequiredElement<HTMLElement>("#order-summary");
const cartBadgeElement = getRequiredElement<HTMLSpanElement>(".cart-badge");

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function renderCartBadge(cart: CartItem[]): void {
  cartBadgeElement.textContent = String(getCartItemCount(cart));
}

function cartItemHTML(item: CartItem): string {
  const { id, title, price, thumbnail, quantity } = item;

  return `
    <article class="cart-item" data-id="${id}">
      <img src="${thumbnail}" alt="${title}" />
      <div class="cart-item-content">
        <div><h2>${title}</h2><p class="cart-item-price">${formatPrice(price)}</p></div>
        <div class="cart-item-actions">
          <label class="quantity-field" for="quantity-${id}">
            <span>Số lượng</span>
            <input class="quantity-input" id="quantity-${id}" min="1" type="number" value="${quantity}" />
          </label>
          <button class="remove-button" data-action="remove" type="button">Xóa</button>
        </div>
      </div>
    </article>
  `;
}

function orderSummaryHTML(cart: CartItem[]): string {
  const total = getCartTotal(cart);
  const isEmpty = cart.length === 0;

  return `
    <h2 id="order-summary-heading">Tóm tắt đơn hàng</h2>
    <dl class="order-totals">
      <dt>Tạm tính</dt><dd>${formatPrice(total)}</dd>
      <dt>Phí vận chuyển</dt><dd>Miễn phí</dd>
      <dt class="order-total-label">Tổng cộng</dt><dd class="order-total-value">${formatPrice(total)}</dd>
    </dl>
    <button class="checkout-button" type="button" ${isEmpty ? "disabled" : ""}>Thanh toán</button>
  `;
}

function renderCart(): void {
  const cart = loadCart();

  renderCartBadge(cart);
  cartItemsElement.innerHTML = cart.length === 0
    ? '<p class="empty-cart">Giỏ hàng đang trống. <a href="index.html">Tiếp tục mua sắm</a>.</p>'
    : cart.map(cartItemHTML).join("");
  orderSummaryElement.innerHTML = orderSummaryHTML(cart);
}

cartItemsElement.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const removeButton = target.closest<HTMLButtonElement>('[data-action="remove"]');
  const productId = Number(removeButton?.closest<HTMLElement>("[data-id]")?.dataset.id);

  if (!removeButton || !Number.isInteger(productId)) {
    return;
  }

  removeFromCart(productId);
  renderCart();
});

cartItemsElement.addEventListener("change", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement) || !target.matches(".quantity-input")) {
    return;
  }

  const productId = Number(target.closest<HTMLElement>("[data-id]")?.dataset.id);

  if (!Number.isInteger(productId)) {
    return;
  }

  updateQuantity(productId, target.value);
  renderCart();
});

renderCart();
