import { NextResponse } from "next/server";
import z from "zod";
import { topicsListSchema } from "./topics-list.schema";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const response = await fetch(
      "https://dev.mista.ru/api/topic.php" + url.search
    );
    const data = await response.json();

    const items = z.parse(topicsListSchema, data);

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
