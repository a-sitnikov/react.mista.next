import { parse } from "node-html-parser";
import { IMessage } from "./types";
import { parseMessage } from "./message-get";

const parseMessages = (html: string): IMessage[] => {
  const root = parse(html);
  const rows = root.querySelectorAll("tr.message-row");

  return rows.map(parseMessage);
};

export const fetchTopicRefresh = async (topicId: string, lastN: string) => {
  const body = new URLSearchParams();
  body.append("TOPIC_ID", topicId);
  body.append("LAST_N", lastN);

  const MISTA_DOMAIN = process.env.MISTA_DOMAIN;

  const response = await fetch(`${MISTA_DOMAIN}/topic/refresh`, {
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
    return parseMessages(html);
  } else {
    throw new Error(payload.data || "Failed to parse topic data");
  }
};
