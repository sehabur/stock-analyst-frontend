import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/prices/getSymbolTvchart`,
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
