// lagring på web: nettleseren kan ikke skrive filer, så dev-serveren gjør det (app/api/fakedb+api.ts → data/fakeDb.json)

const ROUTE = "/api/fakedb";

export async function readText() {
  const response = await fetch(ROUTE);
  if (response.status === 204) return undefined;
  if (!response.ok) throw new Error(`Kunne ikke lese fakeDb (${response.status})`);
  return response.text();
}

export async function writeText(text: string) {
  const response = await fetch(ROUTE, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: text,
  });
  if (!response.ok) throw new Error(`Kunne ikke skrive fakeDb (${response.status})`);
}
