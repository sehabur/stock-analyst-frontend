import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const authToken: any = headersList.get("Authorization");

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/generateOtp`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
