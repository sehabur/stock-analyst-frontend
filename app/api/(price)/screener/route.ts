import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body: any = new Response(request.body);

  const reqBody = await body.json();

  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/screener`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return NextResponse.json(data);
}
