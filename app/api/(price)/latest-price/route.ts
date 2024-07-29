import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/prices/latestPrice?v=1`,
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
