import { NextResponse } from "next/server";
import z from "zod";
import { messageSchema, topicInfoSchema } from "../topic.schema";

interface IParams {
  id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<IParams> }
) {
  const { id } = await params;

  try {
    const [infoData, itemsData] = await Promise.all([
      fetch(`https://dev.mista.ru/ajax_gettopic.php?id=${id}`).then((resp) =>
        resp.json()
      ),
      fetch(`https://dev.mista.ru/api/message.php?id=${id}`).then((resp) =>
        resp.json()
      ),
    ]);

    const info = z.parse(topicInfoSchema, infoData);
    const items = z.parse(messageSchema.array(), itemsData);

    return NextResponse.json({ info, items });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
