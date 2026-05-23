import { HTMLElement, parse } from "node-html-parser";
import { IMessage } from "./types";

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
            ?.replace("voting-variant", "") ?? undefined,
      }
    : undefined;

  const inlinksCell = row.querySelector("table.filebar");
  const imgs = inlinksCell
    ?.querySelectorAll("td.slot")
    .map((slot) => slot.getAttribute("data-filename") ?? "")
    .map((filename) => `${process.env.MISTA_DOMAIN}${filename}`)
    .filter(Boolean);

  return {
    n,
    user,
    userId,
    date: `${date} ${time}`,
    text,
    voting: votingVariant,
    imgs,
  };
};

export const fetchMessageGet = async (topicId: string, n: number | string) => {
  const body = new URLSearchParams();
  body.append("TOPIC_ID", topicId);
  body.append("MESSAGE_N", String(n));

  const MISTA_DOMAIN = process.env.MISTA_DOMAIN;

  const response = await fetch(`${MISTA_DOMAIN}/message/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const text = await response.text();
  const payload = JSON.parse(text);
  if (payload.success === "1") {
    const html = `<tr>${payload.data}</tr>`;
    return parseMessage(html);
  } else {
    throw new Error(payload.data);
  }
};
