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
  const cookie = req.headers.get("cookie");

  try {
    const { data, headers } = await fetchMessageGet(id, messageId, cookie);
    return NextResponse.json(data, { headers });
  } catch (error) {
    const message = (error as Error).message;
    if (message.includes("is not valid JSON")) {
      return new NextResponse(message, { status: 500 });
    } else {
      return new NextResponse(message, { status: 500 });
    }
  }
}
