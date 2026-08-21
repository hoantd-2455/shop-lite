const API_BASE_URL = "https://dummyjson.com";

export async function getJSON(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

export async function getProducts() {
  const data = await getJSON("/products?limit=12");

  return data.products;
}

export async function getProductById(id) {
  return getJSON(`/products/${id}`);
}