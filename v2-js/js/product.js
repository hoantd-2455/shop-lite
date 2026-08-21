import { getProductById } from "./api.js";
import { addToCart, getCartItemCount } from "./cart.js";

const productDetailElement = document.querySelector("#product-detail");
const productStatusElement = document.querySelector("#product-status");
const cartBadgeElement = document.querySelector(".cart-badge");

let currentProduct = null;

function renderCartBadge() {
  cartBadgeElement.textContent = getCartItemCount();
}

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatCategory(category) {
  return category.replaceAll("-", " ");
}

function showLoading() {
  productDetailElement.hidden = true;
  productStatusElement.dataset.state = "loading";
  productStatusElement.textContent = "Đang tải thông tin sản phẩm...";
}

function showError(message) {
  productDetailElement.hidden = true;
  productStatusElement.dataset.state = "error";
  productStatusElement.textContent = message;
}

function renderProduct(product) {
  const { id, title, price, thumbnail, category, rating, description, stock } =
    product;

  productDetailElement.innerHTML = `
    <img
      class="product-detail-image"
      src="${thumbnail}"
      alt="${title}"
    />

    <div>
      <p class="product-category">${formatCategory(category)}</p>
      <h1>${title}</h1>
      <p class="product-detail-price">${formatPrice(price)}</p>
      <p class="product-detail-description">${description}</p>

      <dl class="product-meta">
        <dt>Tình trạng</dt>
        <dd>${stock > 0 ? `Còn ${stock} sản phẩm` : "Hết hàng"}</dd>

        <dt>Đánh giá</dt>
        <dd>${rating} / 5</dd>
      </dl>

      <button
        class="add-to-cart-button"
        data-id="${id}"
        type="button"
      >
        Thêm vào giỏ
      </button>
    </div>
  `;

  document.title = `ShopLite | ${title}`;
  productStatusElement.textContent = "";
  productStatusElement.dataset.state = "";
  productDetailElement.hidden = false;
}

async function initialize() {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));

  if (!Number.isInteger(productId) || productId <= 0) {
    showError("Không tìm thấy mã sản phẩm hợp lệ.");
    return;
  }

  showLoading();

  try {
    currentProduct = await getProductById(productId);

    renderProduct(currentProduct);
  } catch (error) {
    console.error("Không thể tải sản phẩm:", error);
    showError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
  }
}

productDetailElement.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-to-cart-button");

  if (!addButton || !currentProduct) {
    return;
  }

  addToCart(currentProduct);
  renderCartBadge();
});

renderCartBadge();
initialize();
