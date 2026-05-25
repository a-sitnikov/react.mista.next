import { NextResponse } from "next/server";
import { mistaTopicRefresh } from "@/mista-api/topic-refresh";

interface IParams {
  id: string;
  lastN: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> },
) {
  const cookie = req.headers.get("cookie");

  const { id, lastN = "-1" } = await params;

  try {
    const { data, headers } = await mistaTopicRefresh(id, lastN, cookie);
    return NextResponse.json(data, { headers });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
