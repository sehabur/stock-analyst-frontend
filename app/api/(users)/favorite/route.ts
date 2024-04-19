import { NextResponse, NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.BACKEND_URL}/api/users/favorite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
