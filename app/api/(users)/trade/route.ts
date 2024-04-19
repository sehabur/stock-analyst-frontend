import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function PATCH(request: NextRequest) {
  try {
    const headersList = headers();
    const authToken: any = headersList.get("Authorization");

    const body = await request.json();

    const tradeType = body.type;

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/trade/${tradeType}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
