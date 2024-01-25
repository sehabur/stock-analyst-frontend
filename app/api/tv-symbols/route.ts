export async function GET(request: Request) {

  const res = await fetch(`${process.env.BACKEND_URL}/api/prices/getSymbolTvchart`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  return Response.json(data);
}
