import { NextResponse } from "next/server";
import { fetchTopicRefresh } from "@/mista-api/topic-refresh";

interface IParams {
  id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> },
) {
  const url = new URL(req.url);
  const lastN = url.searchParams.get("last_n") ?? "-1";

  const { id } = await params;

  try {
    const items = await fetchTopicRefresh(id, lastN);
    return NextResponse.json(items);
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
