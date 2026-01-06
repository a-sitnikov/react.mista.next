import { NextResponse } from "next/server";
import z from "zod";
import { topicInfoSchema } from "../topic.schema";

interface IParams {
  id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> }
) {
  const { id } = await params;

  try {
    const response = await fetch(
      "https://dev.mista.ru/ajax_gettopic.php?id=" + id
    );
    const data = await response.json();

    const info = z.parse(topicInfoSchema, data);

    return NextResponse.json({ info });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
