export async function makeApiRequest(path: string) {
  try {
    const response = await fetch(`/api/${path}`, { next: { revalidate: 0 } });
    return response.json();
  } catch (error: any) {
    throw new Error(`Request error: ${error.status}`);
  }
}

export function generateSymbol(fromSymbol: any) {
  return {
    short: fromSymbol,
    full: fromSymbol,
  };
}

export function parseFullSymbol(fullSymbol: string) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }
  return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}
