export type Product = { id: number; name: string; price: number };

const products: Product[] = [
  { id: 1, name: "Mechanical keyboard", price: 1800 },
  { id: 2, name: "USB-C hub", price: 650 },
  { id: 3, name: "Laptop stand", price: 900 },
];

// Pretends to be a database that takes a while to answer.
export async function getProducts(delayMs = 1500) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return products;
}
