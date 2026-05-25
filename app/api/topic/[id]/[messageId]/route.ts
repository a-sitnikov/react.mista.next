import { mistaMessageGet } from "@/mista-api/message-get";
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
    const { data, headers } = await mistaMessageGet(id, messageId, cookie);

    headers?.append("Access-Control-Allow-Origin", "*");
    headers?.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    headers?.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

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

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
