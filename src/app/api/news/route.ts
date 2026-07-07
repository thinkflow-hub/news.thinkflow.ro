import { NextRequest, NextResponse } from "next/server";
import { readNewsFile, getAllDates } from "@/lib/data-loader";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const category = searchParams.get("category");

  let items;
  if (date) {
    items = readNewsFile(date);
    if (items.length === 0) {
      return NextResponse.json({ error: "No data for date" }, { status: 404 });
    }
  } else {
    const dates = getAllDates();
    if (dates.length === 0) {
      return NextResponse.json({ error: "No data available" }, { status: 404 });
    }
    items = readNewsFile(dates[0]);
  }

  if (category) {
    items = items.filter((i) => i.category === category);
  }

  return NextResponse.json({
    date: date || getAllDates()?.[0] || null,
    total_items: items.length,
    items,
  });
}
