import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  // try {
  const headersList = headers();
  const authToken: any = headersList.get("Authorization");

  // const searchParams = useSearchParams();

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const getType = searchParams.get("getType");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/tvcharts/chart?id=${id}&getType=${getType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return NextResponse.json(data, { status: res.status });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(error, { status: 500 });
  // }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const headersList = headers();
    const authToken: any = headersList.get("Authorization");

    const res = await fetch(`${process.env.BACKEND_URL}/api/tvcharts/chart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
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

export async function DELETE(request: NextRequest) {
  // try {
  const headersList = headers();
  const authToken: any = headersList.get("Authorization");

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/tvcharts/chart?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return NextResponse.json(data, { status: res.status });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(error, { status: 500 });
  // }
}
