import { fetchMessageGet } from "@/mista-api/message-get";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
  messageId: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> },
) {
  const { id, messageId } = await params;
  const data = await fetchMessageGet(id, messageId);

  return NextResponse.json(data);
}
