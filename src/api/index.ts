export const getProducts = async () => {
  const response = await fetch('http://localhost:8080/product');
  return await response.json();
}
