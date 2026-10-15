// lagring på web: localStorage i nettleseren (expo-file-system finnes ikke på web)

const KEY = "fakeDb";

export async function readText() {
  return localStorage.getItem(KEY) ?? undefined;
}

export function writeText(text: string) {
  localStorage.setItem(KEY, text);
}
