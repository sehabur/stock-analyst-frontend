import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    const headersList = headers();
    const authToken: any = headersList.get("Authorization");

    const res = await fetch(
      `${process.env.BACKEND_URL}/api/users/profile/${id}`,
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
