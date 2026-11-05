// The "database": one price, kept in memory. Restarting the server resets it.
let price = 100;

export async function readPrice() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return price;
}

export function writePrice(newPrice: number) {
  price = newPrice;
}

export const now = () => new Date().toLocaleTimeString("en-GB");
