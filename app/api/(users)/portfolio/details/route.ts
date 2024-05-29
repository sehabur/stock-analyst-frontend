import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const authToken: any = headersList.get("Authorization");

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/portfolio/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        next: { revalidate: 0 },
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
