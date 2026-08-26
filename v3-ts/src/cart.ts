import type { CartItem, Product } from "./types";

const CART_STORAGE_KEY = "shoplite-v2-cart";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.price === "number" &&
    typeof value.thumbnail === "string" &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

export function loadCart(): CartItem[] {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    const cart: unknown = JSON.parse(savedCart);

    if (Array.isArray(cart) && cart.every(isCartItem)) {
      return cart;
    }

    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  }
}

export function saveCart(cart: CartItem[]): CartItem[] {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  return cart;
}

export function addToCart(product: Product): CartItem[] {
  const cart = loadCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const { id, title, price, thumbnail } = product;

    cart.push({ id, title, price, thumbnail, quantity: 1 });
  }

  return saveCart(cart);
}

export function removeFromCart(productId: number): CartItem[] {
  return saveCart(loadCart().filter((item) => item.id !== productId));
}

export function updateQuantity(
  productId: number,
  quantity: number | string,
): CartItem[] {
  const nextQuantity = Number(quantity);

  if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
    return removeFromCart(productId);
  }

  const cart = loadCart().map((item) => {
    return item.id === productId ? { ...item, quantity: nextQuantity } : item;
  });

  return saveCart(cart);
}

export function getCartItemCount(cart: CartItem[] = loadCart()): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(cart: CartItem[] = loadCart()): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
