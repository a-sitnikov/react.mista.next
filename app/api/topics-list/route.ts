import { NextResponse } from "next/server";
import z from "zod";
import { topicsListSchema } from "./topics-list.schema";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const paramsMapping = new Map([["section", "section_short_name"]]);

  // Remap incoming search params according to paramsMatching before forwarding
  const outgoingParams = new URLSearchParams();
  url.searchParams.forEach((value, key) => {
    const mappedKey = paramsMapping.get(key) ?? key;
    outgoingParams.append(mappedKey, value);
  });

  const targetUrl = `https://dev.mista.ru/api/topic.php?${outgoingParams.toString()}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();

    const items = z.parse(topicsListSchema, data);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching topic list:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
