import { parse } from "node-html-parser";
import { undefinedIfEmpty } from "@/lib/utils";
import { ITopicsListItem } from "./types";

function parseTopics(html: string): ITopicsListItem[] {
  const root = parse(html);

  return root.querySelectorAll("#topicsList tr[data-topic-id]").map((row) => {
    const attr = (name: string) => row.getAttribute(name) ?? "";

    const repliesText = row.querySelector(".replies")?.text.trim() ?? "";
    const answers = parseInt(repliesText.replace(/\s+/g, ""), 10);

    return {
      id: attr("data-topic-id"),
      text: row.querySelector(".topic-link")?.text.trim() ?? "",
      count: isNaN(answers) ? 0 : answers,
      forum: attr("data-arena"),
      section: undefinedIfEmpty(attr("data-section")),
      author: row.querySelector(".user-link")?.text.trim() ?? "",
      authorId: attr("data-author-id"),
      updated: row.querySelector(".updated")?.text.trim() ?? "",
      down:
        row.querySelector("span.status")?.text.trim() === "↓"
          ? true
          : undefined,
      isVoting: row.querySelector("span.voting-marker") ? true : undefined,
      paid: attr("class")?.includes("paid") === true ? true : undefined,
    };
  });
}

export const fetchTopicsList = async (
  searchParams: URLSearchParams,
  cookie?: string | null,
) => {
  const url = `${process.env.MISTA_DOMAIN}${searchParams}`;

  const headers = new Headers();
  if (cookie) {
    headers.set("cookie", cookie);
  }

  const response = await fetch(url, { headers });
  const html = await response.text();

  const data = parseTopics(html);

  const respHeaders = new Headers(response.headers);
  respHeaders.delete("content-encoding");
  respHeaders.delete("content-length");
  respHeaders.set("content-type", "application/json");

  return { data, headers: respHeaders };
};
