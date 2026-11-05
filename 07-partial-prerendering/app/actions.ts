"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";

export async function signIn(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim() || "student";
  (await cookies()).set("name", name);
  refresh();
}

export async function signOut() {
  (await cookies()).delete("name");
  refresh();
}
