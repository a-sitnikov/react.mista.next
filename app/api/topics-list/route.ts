import { NextResponse } from "next/server";
import z from "zod";
import { topicsListSchema } from "../schemas";

export async function GET(req: Request) {
  const url = new URL(req.url);
  console.log("topics-list", url.search); // Log the search parameters for debugging

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
