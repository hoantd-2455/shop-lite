/** Lấy một phần tử DOM bắt buộc phải tồn tại. */
export function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Không tìm thấy phần tử: ${selector}`);
  }

  return element;
}
