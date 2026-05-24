import { NextResponse } from "next/server";
import { fetchTopicsList } from "@/mista-api/topics-list";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie");

  try {
    const { data, headers } = await fetchTopicsList(url.searchParams, cookie);

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error("Error fetching topic list:", error);
    return NextResponse.json(
      { error: () => (error as Error).message },
      { status: 500 },
    );
  }
}
