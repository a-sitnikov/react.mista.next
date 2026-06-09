"use server";

import { cookies } from "next/headers";

export async function updateThemeAction(theme: string) {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme, { path: "/", maxAge: 31536000 });
}
