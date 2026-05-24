import { NextResponse } from "next/server";
import { fetchTopicsList } from "@/mista-api/topics-list";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie");

  try {
    const { data, headers } = await fetchTopicsList(url.searchParams, cookie);

    return NextResponse.json(data, { headers });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
