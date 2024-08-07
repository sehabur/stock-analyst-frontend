import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const tradingCode = searchParams.get("code");

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/prices/technical/stock/${tradingCode}`,
      {
        next: { revalidate: 0 },
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
