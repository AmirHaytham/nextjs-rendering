import { connection } from "next/server";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Three "database calls" with very different speeds.
export async function getSidebar() {
  await connection();
  await wait(1000);
  return ["Inbox", "Courses", "Grades"];
}

export async function getMainContent() {
  await connection();
  await wait(3000);
  return "Your timetable for this week: Software Project I on Sunday and Tuesday.";
}

export async function getFooter() {
  await connection();
  await wait(500);
  return "GIU, Software Project I";
}
