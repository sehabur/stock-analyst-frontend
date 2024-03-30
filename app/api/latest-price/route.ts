export async function GET(request: Request) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/latestPrice`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return Response.json(data);
}
