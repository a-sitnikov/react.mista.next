import { parse } from "node-html-parser";
import { IMessage } from "./types";
import { parseMessage } from "./message-get";
import { fetchMista } from "./utils";

const parseMessages = (html: string): IMessage[] => {
  const root = parse(html);
  const rows = root.querySelectorAll("tr.message-row");

  return rows.map(parseMessage);
};

export const mistaTopicRefresh = async (
  topicId: string,
  lastN: string,
  cookie?: string | null,
) => {
  const body = new URLSearchParams();
  body.append("TOPIC_ID", topicId);
  body.append("LAST_N", lastN);

  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
  });

  if (cookie) {
    headers.set("cookie", cookie);
  }

  const response = await fetchMista(`/topic/refresh`, {
    method: "POST",
    headers,
    body,
  });

  const text = await response.text();

  const payload = JSON.parse(text);
  if (payload.success === "1") {
    const data = JSON.parse(payload.data);
    const html = `<table>${data.MESSAGES_HTML}</table>`;

    const headers = new Headers(response.headers);
    headers.delete("content-encoding");
    headers.delete("content-length");
    headers.set("content-type", "application/json");

    return { data: parseMessages(html), headers };
  } else {
    throw new Error(payload.data || "Failed to parse topic data");
  }
};
