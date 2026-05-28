import { parse } from "node-html-parser";
import { undefinedIfEmpty } from "@/lib/utils";
import { ITopicsListItem } from "./types";
import { IErrorResponse, IOKResponse } from "@/app/api/types";
import { fetchMista } from "./utils";

function parseTopics(html: string): ITopicsListItem[] | undefined {
  const root = parse(html);

  const rows = root.querySelectorAll("#topicsList tr[data-topic-id]");
  if (rows.length === 0) {
    return undefined;
  }

  return rows.map((row) => {
    const attr = (name: string) => row.getAttribute(name) ?? "";

    const repliesText = row.querySelector(".replies")?.text.trim() ?? "";
    const answers = parseInt(repliesText.replace(/\s+/g, ""), 10);

    return {
      id: attr("data-topic-id"),
      text: row.querySelector(".topic-link")?.text.trim() ?? "",
      count: isNaN(answers) ? 0 : answers,
      arena: attr("data-arena"),
      section: undefinedIfEmpty(attr("data-section")),
      author: {
        id: attr("data-author-id"),
        name: row.querySelector(".user-link")?.text.trim() ?? "",
      },
      updated: row.querySelector(".updated")?.text.trim() ?? "",
      down:
        row.querySelector("span.status")?.text.trim() === "↓"
          ? true
          : undefined,
      closed:
        row.querySelector("span.status")?.text.trim() === "Ø"
          ? true
          : undefined,
      isVoting: row.querySelector("span.voting-marker") ? true : undefined,
      paid: attr("class")?.includes("paid") === true ? true : undefined,
    };
  });
}

export const mistaTopicsList = async (
  searchParams: URLSearchParams,
  cookie?: string | null,
) => {
  const headers = new Headers();
  if (cookie) {
    headers.set("cookie", cookie);
  }

  const response = await fetchMista(`/${searchParams.toString()}`, { headers });
  const html = await response.text();

  const respHeaders = new Headers(response.headers);
  respHeaders.delete("content-encoding");
  respHeaders.delete("content-length");
  respHeaders.set("content-type", "application/json");

  const data = parseTopics(html);
  if (!data) {
    return {
      ok: false,
      error: "Failed to parse topics list",
      text: html,
      headers: respHeaders,
    } satisfies IErrorResponse;
  } else {
    return {
      ok: true,
      data,
      headers: respHeaders,
    } satisfies IOKResponse<ITopicsListItem[]>;
  }
};
