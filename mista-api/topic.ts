import { parse } from "node-html-parser";
import { ITopic } from "./types";
import { parseMessage } from "./message-get";
import { fetchMista } from "./utils";

function parseTopic(html: string, topicId: string): ITopic {
  const root = parse(html);

  const titleEl = root.querySelector("th.topic-title");
  const title = titleEl?.querySelector("a")?.text.trim() ?? "";
  const readers =
    titleEl
      ?.querySelector("div.readers")
      ?.querySelectorAll("a")
      .map((a) => ({
        id: a.getAttribute("href")?.replace("/user/", "") ?? "",
        name: a.text.trim(),
      })) ?? [];

  const items = root.querySelectorAll("tr.message-row").map(parseMessage);

  return {
    info: {
      id: topicId,
      title,
      author: items[0].user,
      readers,
    },
    items,
  };
}

export const mistaTopic = async (topicId: string, cookie?: string | null) => {
  const headers = new Headers();
  if (cookie) {
    headers.set("cookie", cookie);
  }

  const response = await fetchMista(`/topic/${topicId}`, { headers });
  const html = await response.text();

  const fixedHtml = html.replace(/<\/div<\/th>/gi, "<\/div><\/th>");

  const data = parseTopic(fixedHtml, topicId);

  const respHeaders = new Headers(response.headers);
  respHeaders.delete("content-encoding");
  respHeaders.delete("content-length");
  respHeaders.set("content-type", "application/json");

  return { data, headers: respHeaders };
};
