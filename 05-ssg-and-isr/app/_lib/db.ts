// A pretend database where the price changes by itself every 10 seconds,
// so you can watch which page notices.
export async function getPrice() {
  await new Promise((resolve) => setTimeout(resolve, 300)); // a slow query
  const step = Math.floor(Date.now() / 10_000) % 10;
  return 100 - step * 5; // 100, 95, 90 ... then back to 100
}

export const now = () => new Date().toLocaleTimeString("en-GB");
