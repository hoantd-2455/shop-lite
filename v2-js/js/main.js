import { getProducts } from "./api.js";
import { filterByKeyword } from "./product-utils.js";
import { addToCart, getCartItemCount } from "./cart.js";

const productListElement = document.querySelector("#product-list");
const searchFormElement = document.querySelector(".search-form");
const searchInputElement = document.querySelector("#search");
const emptyStateElement = document.querySelector("#empty-state");
const productStatusElement = document.querySelector("#product-status");
const cartBadgeElement = document.querySelector(".cart-badge");

let products = [];

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function productCardHTML(product) {
  const { id, title, price, thumbnail, category, rating } = product;

  return `
    <article class="product-card" data-id="${id}">
      <img src="${thumbnail}" alt="${title}" />
      <h2>
        <a href="product.html?id=${id}">${title}</a>
      </h2>
      <p class="product-description">
        ${category} · ⭐ ${rating}
      </p>
      <p class="product-price">${formatPrice(price)}</p>
      <button class="add-to-cart-button" type="button">
        Thêm vào giỏ
      </button>
    </article>
  `;
}

function renderProducts(list) {
  productListElement.innerHTML = list.map(productCardHTML).join("");
  emptyStateElement.hidden = list.length > 0;
}

searchFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
});

searchInputElement.addEventListener("input", (event) => {
  const filteredProducts = filterByKeyword(products, event.target.value);

  renderProducts(filteredProducts);
});

productListElement.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-to-cart-button");

  if (!addButton) {
    return;
  }

  const productCard = addButton.closest("[data-id]");
  const productId = Number(productCard.dataset.id);

  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  addToCart(selectedProduct);
  renderCartBadge();

  console.log("Đã thêm vào giỏ:", selectedProduct);
});

function showLoading() {
  productListElement.innerHTML = "";
  emptyStateElement.hidden = true;
  productStatusElement.dataset.state = "loading";
  productStatusElement.textContent = "Đang tải sản phẩm...";
}

function showError() {
  productListElement.innerHTML = "";
  emptyStateElement.hidden = true;
  productStatusElement.dataset.state = "error";
  productStatusElement.textContent =
    "Không thể tải sản phẩm. Vui lòng kiểm tra kết nối và thử lại.";
}

async function initialize() {
  showLoading();
  searchInputElement.disabled = true;

  try {
    products = await getProducts();

    productStatusElement.textContent = "";
    productStatusElement.dataset.state = "";
    renderProducts(products);
    searchInputElement.disabled = false;
  } catch (error) {
    console.error("Không thể tải products:", error);
    showError();
  }
}

function renderCartBadge() {
  cartBadgeElement.textContent = getCartItemCount();
}

renderCartBadge();
initialize();
