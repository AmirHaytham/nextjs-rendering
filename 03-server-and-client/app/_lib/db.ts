import "server-only"; // importing this file from a Client Component is a build error

// Stands in for a real database and a secret key. Both live on the server only.
const DATABASE_PASSWORD = "SECRET_DB_PASSWORD_7f3a";

const grades = [
  { course: "Software Project I", grade: "A" },
  { course: "Databases", grade: "B+" },
  { course: "Computer Networks", grade: "A-" },
];

export async function getGrades() {
  // A real app would connect with DATABASE_PASSWORD here.
  void DATABASE_PASSWORD;
  return grades;
}
