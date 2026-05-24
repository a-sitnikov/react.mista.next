import { NextResponse } from "next/server";
import { fetchTopicsList } from "@/mista-api/topics-list";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie");

  try {
    const { ok, data, text, headers } = await fetchTopicsList(
      url.searchParams,
      cookie,
    );

    if (!ok) {
      return NextResponse.json({ ok: false, error: data, text }, { headers });
    }

    return NextResponse.json({ ok: true, data }, { headers });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}

export type IAPITopicsList = Awaited<ReturnType<typeof fetchTopicsList>>;
