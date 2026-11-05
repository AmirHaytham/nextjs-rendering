"use server";

import { refresh, revalidateTag, updateTag } from "next/cache";
import { writePrice } from "../_lib/db";

function newPrice(formData: FormData) {
  return Number(formData.get("price"));
}

// 1. Change the database only. The cached product page knows nothing about it.
export async function changePriceOnly(formData: FormData) {
  writePrice(newPrice(formData));
  refresh();
}

// 2. Change it and mark the cache as stale. The next visitor still gets the
//    old page while a fresh one is built in the background, like ISR.
export async function changeAndRevalidate(formData: FormData) {
  writePrice(newPrice(formData));
  revalidateTag("price", "max");
  refresh();
}

// 3. Change it and expire the cache right now. The very next visit waits
//    for a fresh page. Best when the user must see their own change.
export async function changeAndUpdate(formData: FormData) {
  writePrice(newPrice(formData));
  updateTag("price");
  refresh();
}
