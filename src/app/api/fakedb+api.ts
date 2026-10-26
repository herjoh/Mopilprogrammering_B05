/// <reference types="node" />
// kjører i dev-serveren, ikke i nettleseren. leser og skriver data/fakeDb.json for web
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const FILE = join(process.cwd(), "data", "fakeDb.json");

export function GET() {
  // tomt svar når fila ikke finnes ennå (404 blir rød i konsollen)
  if (!existsSync(FILE)) return new Response(null, { status: 204 });
  return new Response(readFileSync(FILE, "utf8"), { headers: { "content-type": "application/json" } });
}

export async function PUT(request: Request) {
  mkdirSync(dirname(FILE), { recursive: true });
  writeFileSync(FILE, await request.text());
  return new Response(null, { status: 204 });
}
