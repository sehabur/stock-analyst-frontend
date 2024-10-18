import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const headersList = headers();
    const authToken: any = headersList.get("Authorization");

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/changePassword`,
      {
        method: "POST",
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
