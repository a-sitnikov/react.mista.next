import { HTMLElement, parse } from "node-html-parser";
import { IMessage } from "./types";
import { undefinedIfEmpty } from "@/lib/utils";
import { fetchMista } from "./utils";

export const parseMessage = (html: string | HTMLElement): IMessage => {
  let row: HTMLElement;
  if (typeof html === "string") {
    row = parse(html);
  } else {
    row = html;
  }

  const n = parseInt(row.querySelector("a.message-n")?.text?.trim() ?? "0", 10);
  const userEl = row.querySelector("a.message-user");
  const user = userEl?.text?.trim() ?? "";
  const userId = userEl?.getAttribute("data-user-id") ?? "";
  const date = row.querySelector(".message-date")?.text?.trim() ?? "";
  const time = row.querySelector(".message-time")?.text?.trim() ?? "";
  const text = row.querySelector(".message-text")?.innerHTML?.trim() ?? "";

  const votingEl = row.querySelector("div[class*='voting-variant']");
  const votingVariant = votingEl
    ? {
        text: votingEl.text?.trim() ?? "",
        variant:
          [...(votingEl.getAttribute("class")?.split(" ") ?? [])]
            .find((c) => c.startsWith("voting-variant"))
            ?.replace("voting-variant", "") ?? "1",
      }
    : undefined;

  const inlinksCell = row.querySelector("table.filebar");
  const imgs = inlinksCell
    ?.querySelectorAll("td.slot")
    .map((slot) => slot.getAttribute("data-filename") ?? "")
    .map((filename) => `${process.env.MISTA_DOMAIN}${filename}`)
    .filter(Boolean);

  const pollEl = row.querySelectorAll("table.tableVotingResults tr.variant");
  const poll = pollEl.map((pollRow) => {
    const linkEl = pollRow.querySelector("td.text a");
    const rawText = linkEl?.text.trim() ?? "";

    const number =
      linkEl
        ?.getAttribute("class")
        ?.split(".")
        .find((cn) => cn.startsWith("voting-variant"))
        ?.replace("voting-variant", "") ?? "1";

    const text = rawText.replace(/^\d+\.\s*/, "").trim();

    const resultText = pollRow.querySelector("td.result")?.text.trim() ?? "";
    const resultMatch = resultText.match(/(\d+)%\s*\((\d+)\)/);
    const percentage = resultMatch ? parseInt(resultMatch[1], 10) : 0;
    const votes = resultMatch ? parseInt(resultMatch[2], 10) : 0;

    return {
      number: parseInt(number, 10),
      text,
      percentage,
      votes,
    };
  });

  return {
    n,
    user: {
      id: userId,
      name: user,
    },
    date: `${date} ${time}`,
    text,
    voting: votingVariant,
    imgs,
    poll: undefinedIfEmpty(poll?.sort((a, b) => a.number - b.number)),
  };
};

export const mistaMessageGet = async (
  topicId: string,
  n: number | string,
  cookie?: string | null,
) => {
  const body = new URLSearchParams();
  body.append("TOPIC_ID", topicId);
  body.append("MESSAGE_N", String(n));

  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  });

  if (cookie) {
    headers.set("cookie", cookie);
  }

  const response = await fetchMista(`/message/get`, {
    method: "POST",
    headers,
    body,
  });

  const text = await response.text();

  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    return {
      ok: false,
      error: (error as Error).message,
      text,
    };
  }

  if (payload.success === "1") {
    const html = `<tr>${payload.data}</tr>`;
    const data = parseMessage(html);

    const headers = new Headers(response.headers);
    headers.delete("content-encoding");
    headers.delete("content-length");
    headers.set("content-type", "application/json");

    return {
      ok: true,
      headers,
      data,
    };
  } else {
    return {
      ok: false,
      headers: new Headers(response.headers),
      error: payload.data,
    };
  }
};
