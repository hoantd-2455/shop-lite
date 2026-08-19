import { products } from "./data.js";
import { filterByKeyword, sortByPrice } from "./product-utils.js";

const productNames = products.map((product) => product.title);

const audioProducts = products.filter(
  (product) => product.category === "audio",
);

const totalPrice = products.reduce(
  (total, product) => total + product.price,
  0,
);

const productById = products.find((product) => product.id === 2);

const sortedProducts = sortByPrice(products, "desc");
const searchResult = filterByKeyword(products, "loa");

console.log("Tên sản phẩm:", productNames);
console.log("Sản phẩm audio:", audioProducts);
console.log("Tổng giá:", totalPrice);
console.log("Sản phẩm id = 2:", productById);
console.log("Giá giảm dần:", sortedProducts);
console.log("Tìm 'loa':", searchResult);

console.table(products);
