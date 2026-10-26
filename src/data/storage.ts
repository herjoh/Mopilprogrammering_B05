import { File, Paths } from "expo-file-system";

// lagring på ios/android: en json-fil i appens dokumentmappe

function dbFile() {
  return new File(Paths.document, "fakeDb.json");
}

export async function readText() {
  const file = dbFile();
  return file.exists ? file.text() : undefined;
}

export function writeText(text: string) {
  const file = dbFile();
  if (!file.exists) file.create();
  file.write(text);
}
