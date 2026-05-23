import { NextResponse } from "next/server";
import { fetchTopicsList } from "@/mista-api/topics-list";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const items = await fetchTopicsList(url.searchParams);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching topic list:", error);
    return NextResponse.json(
      { error: () => (error as Error).message },
      { status: 500 },
    );
  }
}
