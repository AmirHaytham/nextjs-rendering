import { getProducts } from "../../_lib/products";

// The API the CSR page calls from the browser.
export async function GET() {
  return Response.json(await getProducts());
}
