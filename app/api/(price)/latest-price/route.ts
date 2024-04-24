import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/latestPrice`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
