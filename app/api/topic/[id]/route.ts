import { NextResponse } from "next/server";
import { fetchTopic } from "@/mista-api/topic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookie = req.headers.get("cookie");

  try {
    const { data, headers } = await fetchTopic(id, cookie);

    return NextResponse.json(data, { headers });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
