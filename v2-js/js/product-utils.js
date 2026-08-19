export function filterByKeyword(list, keyword = "") {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return list;
  }

  return list.filter(({ title, category }) => {
    return (
      title.toLowerCase().includes(normalizedKeyword) ||
      category.toLowerCase().includes(normalizedKeyword)
    );
  });
}

export function sortByPrice(list, direction = "asc") {
  const multiplier = direction === "desc" ? -1 : 1;

  return [...list].sort((firstProduct, secondProduct) => {
    return (firstProduct.price - secondProduct.price) * multiplier;
  });
}