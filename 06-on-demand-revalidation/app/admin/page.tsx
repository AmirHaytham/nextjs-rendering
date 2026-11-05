import { Suspense } from "react";
import { connection } from "next/server";
import { readPrice } from "../_lib/db";
import { changeAndRevalidate, changeAndUpdate, changePriceOnly } from "./actions";

const buttons = [
  [changePriceOnly, "1. Change the database only", "bg-slate-600"],
  [changeAndRevalidate, "2. Change + revalidateTag", "bg-amber-600"],
  [changeAndUpdate, "3. Change + updateTag", "bg-green-700"],
] as const;

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin</h1>
      <Suspense fallback={<p>Reading the database...</p>}>
        <DatabasePrice />
      </Suspense>
      <form className="space-y-3 rounded border bg-white p-4">
        <input name="price" type="number" defaultValue={80} className="w-32 rounded border p-2" />
        <div className="flex flex-wrap gap-2">
          {buttons.map(([action, label, color]) => (
            <button key={label} formAction={action} className={`rounded px-3 py-2 text-sm text-white ${color}`}>
              {label}
            </button>
          ))}
        </div>
      </form>
      <p className="text-sm text-slate-600">
        After each button, open <a href="/product" className="text-blue-700 underline">/product</a> in
        another tab and refresh it twice.
      </p>
    </div>
  );
}

async function DatabasePrice() {
  await connection();
  return <p>Price in the database right now: <b>${await readPrice()}</b></p>;
}
