import { NextResponse } from "next/server";
import { IMessage1 } from "../topic.schema";
import { parse } from "node-html-parser";

interface IParams {
  id: string;
}

const parseMessages = (html: string): IMessage1[] => {
  const root = parse(html);
  const rows = root.querySelectorAll("tr.message-row");

  return rows.map((row) => {
    const n = parseInt(
      row.querySelector("a.message-n")?.text?.trim() ?? "0",
      10,
    );
    const userEl = row.querySelector("a.message-user");
    const user = userEl?.text?.trim() ?? "";
    const userId = userEl?.getAttribute("data-user-id") ?? "";
    const date = row.querySelector(".message-date")?.text?.trim() ?? "";
    const text = row.querySelector(".message-text")?.innerHTML?.trim() ?? "";

    const votingEl = row.querySelector("div[class*='voting-variant']");
    const votingVariant = votingEl
      ? {
          text: votingEl.text?.trim() ?? "",
          variant:
            [...(votingEl.getAttribute("class")?.split(" ") ?? [])]
              .find((c) => c.startsWith("voting-variant"))
              ?.replace("voting-variant", "") ?? undefined,
        }
      : undefined;

    return { n, user, userId, date, text, voting: votingVariant };
  });
};

export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> },
) {
  const url = new URL(req.url);
  const lastN = url.searchParams.get("last_n") ?? "-1";

  const { id } = await params;

  const body = new URLSearchParams();
  body.append("TOPIC_ID", id);
  body.append("LAST_N", lastN);

  try {
    const response = await fetch(`https://forum.mista.ru/topic/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const text = await response.text();

    const payload = JSON.parse(text);
    if (payload.success === "1") {
      const data = JSON.parse(payload.data);
      const html = `<table>${data.MESSAGES_HTML}</table>`;
      const items = parseMessages(html);
      return NextResponse.json(items);
    } else {
      return NextResponse.json(
        { error: payload.data || "Failed to parse topic data" },
        { status: 500 },
      );
    }
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
