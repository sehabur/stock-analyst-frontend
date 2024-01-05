export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/prices/latestPricesBySearch?search=${id}`,
    {
      next: { revalidate: 0 },
    }
  );

  const data = await res.json();

  return Response.json(data);
}
