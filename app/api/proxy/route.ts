import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  let path = url.searchParams.get("path");

  if (!path) {
    path = "/";
  } else if (!path.startsWith("/")) {
    path = "/" + path;
  }

  const targetUrl = `https://mista.ru${path}`;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    const headers = new Headers(response.headers);

    headers.delete("content-encoding");
    headers.delete("content-length");

    return new NextResponse(text, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Error fetching topic list:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 },
    );
  }
}
