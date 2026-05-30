import { NextResponse } from "next/server";

type Theme = "dark" | "light";

export async function POST(request: Request) {
  const body = await request.json();
  const theme: Theme = body?.theme === "dark" ? "dark" : "light";

  const response = NextResponse.json({ theme });
  response.cookies.set("theme", theme, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  return response;
}
