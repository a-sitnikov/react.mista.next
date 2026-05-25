import { NextResponse } from "next/server";
import { mistaTopicsList } from "@/mista-api/topics-list";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie");

  try {
    const { ok, data, text, headers } = await mistaTopicsList(
      url.searchParams,
      cookie,
    );

    headers?.append("Access-Control-Allow-Origin", "*");
    headers?.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    headers?.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    if (!ok) {
      return NextResponse.json({ ok: false, error: data, text }, { headers });
    }

    return NextResponse.json({ ok: true, data }, { headers });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
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

export type IAPITopicsList = Awaited<ReturnType<typeof mistaTopicsList>>;
