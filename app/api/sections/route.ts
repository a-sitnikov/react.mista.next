import { NextResponse } from "next/server";
import z from "zod";
import { sectionSchema } from "./sections.schema";

export async function GET() {
  try {
    const response = await fetch(
      "https://dev.mista.ru/ajax_getsectionslist.php"
    );
    const data = await response.json();

    const items = z.parse(sectionSchema.array(), data);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    );
  }
}
