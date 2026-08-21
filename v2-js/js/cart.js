const CART_STORAGE_KEY = "shoplite-v2-cart";

export function loadCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    const cart = JSON.parse(savedCart);

    return Array.isArray(cart) ? cart : [];
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  return cart;
}

export function addToCart(product) {
  const cart = loadCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const { id, title, price, thumbnail } = product;

    cart.push({
      id,
      title,
      price,
      thumbnail,
      quantity: 1,
    });
  }

  return saveCart(cart);
}

export function removeFromCart(productId) {
  const cart = loadCart().filter((item) => item.id !== productId);

  return saveCart(cart);
}

export function updateQuantity(productId, quantity) {
  const nextQuantity = Number(quantity);

  if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
    return removeFromCart(productId);
  }

  const cart = loadCart().map((item) => {
    if (item.id === productId) {
      return { ...item, quantity: nextQuantity };
    }

    return item;
  });

  return saveCart(cart);
}

export function getCartItemCount(cart = loadCart()) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(cart = loadCart()) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}