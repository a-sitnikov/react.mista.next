import { ISection } from "@/mista-api/types";
import { NextResponse } from "next/server";

export async function GET() {
  const sections: ISection[] = [
    { arena: "1c", name: "1С:Предприятие 8", code: "v8" },
    { arena: "1c", name: "1С:Предприятие 7.7 и ранее", code: "v7" },
    { arena: "it", name: "IT-новости", code: "it-news" },
    { arena: "it", name: "Веб-мастеринг", code: "web" },
    { arena: "it", name: "Администрирование", code: "admin" },
    { arena: "it", name: "Мобильный мир", code: "mobile" },
    { arena: "job", name: "Вакансии", code: "vacancies" },
    { arena: "job", name: "Работа", code: "job" },
  ];

  try {
    return NextResponse.json(sections, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
