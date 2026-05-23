import { NextResponse } from "next/server";
import { parse } from "node-html-parser";
import { ITopicsListItem } from "./topics-list.schema";
import { undefinedIfEmpty } from "@/lib/utils";

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

export async function GET(req: Request) {
  const mistaURL = new URL(process.env.MISTA_DOMAIN ?? "");

  const url = new URL(req.url);
  url.hostname = mistaURL.hostname;
  url.protocol = mistaURL.protocol;
  url.port = mistaURL.port;
  url.pathname = "";

  const targetUrl = url.toString();

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    const items = parseTopics(html);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching topic list:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 },
    );
  }
}
