import { NextResponse } from "next/server";

import { getObservatoryData } from "@/lib/observatory";

export const revalidate = 3600;

export async function GET() {
  const data = await getObservatoryData();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
