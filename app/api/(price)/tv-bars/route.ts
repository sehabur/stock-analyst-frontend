import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const urlParameters = request.nextUrl.searchParams;

  const params = [
    "exchange",
    "symbol",
    "symbolType",
    "resolutionType",
    "fromTime",
    "toTime",
    "limit",
  ];

  const query = params
    .map((name: string) => `${name}=${urlParameters.get(name)}`)
    .join("&");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/getBarsTvchart?${query}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
