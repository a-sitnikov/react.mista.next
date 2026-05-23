import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

interface Topic {
  id: string;
  text: string;
  answers: number;
  section: string;
  subsection: string;
  author: string;
  authorId: string;
  updated: string;
  down?: boolean;
  isVoting?: boolean;
  paid?: boolean;
}

function extractTopics(html: string): Topic[] {
  const root = parse(html);

  return root.querySelectorAll("#topicsList tr[data-topic-id]").map((row) => {
    const attr = (name: string) => row.getAttribute(name) ?? "";

    const repliesText = row.querySelector(".replies")?.text.trim() ?? "";
    const answers = parseInt(repliesText.replace(/\s+/g, ""), 10);

    return {
      id: attr("data-topic-id"),
      text: row.querySelector(".topic-link")?.text.trim() ?? "",
      answers: isNaN(answers) ? 0 : answers,
      section: attr("data-arena"),
      subsection: attr("data-section"),
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
  const url = new URL(req.url);
  url.hostname = "mista.ru";
  url.protocol = "https:";
  url.port = "";
  url.pathname = "";

  const targetUrl = url.toString();

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    const items = extractTopics(html);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching topic list:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 },
    );
  }
}
