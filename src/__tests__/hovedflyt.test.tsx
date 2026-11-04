jest.mock("expo-file-system", () => {
  let content: string | undefined;
  class File {
    get exists() {
      return content !== undefined;
    }
    create() {
      content = "";
    }
    write(text: string) {
      content = text;
    }
    async text() {
      return content ?? "";
    }
  }
  return { File, Paths: { document: "mock://document" } };
});

jest.mock("expo-secure-store", () => {
  const store = new Map<string, string>();
  return {
    getItemAsync: async (key: string) => store.get(key) ?? null,
    setItemAsync: async (key: string, value: string) => {
      store.set(key, value);
    },
    deleteItemAsync: async (key: string) => {
      store.delete(key);
    },
  };
});

jest.mock("@/data/apiSeed", () => ({ seedFromApi: async (base: unknown) => base }));

import { readSession, saveSession } from "@/data/session";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

it("logg inn, meld inn en sak, se den i lista", async () => {
  const app = await renderRouter("src/app", { initialUrl: "/login" });

  await fireEvent.changeText(await screen.findByPlaceholderText("Skriv inn e-post"), "kari@fiksa.no");
  await fireEvent.changeText(screen.getByPlaceholderText("Skriv inn passord"), "kari1234");
  const [, loggInnKnapp] = screen.getAllByText("Logg inn");
  await fireEvent.press(loggInnKnapp);

  await waitFor(() => expect(app.getPathname()).toBe("/tenantHome"));
  expect(await screen.findByText("Lekkasje under kjøkkenvasken")).toBeTruthy();

  await fireEvent.changeText(screen.getByPlaceholderText("Ovnen funker ikke..."), "Knust vindu");
  await fireEvent.changeText(screen.getByPlaceholderText(/prøvd å skru den av/), "Vinduet på badet er knust.");
  await fireEvent.press(screen.getByText("Send inn"));

  expect(await screen.findByText("Knust vindu")).toBeTruthy();
  expect(screen.getByText("Vinduet på badet er knust.")).toBeTruthy();
});

it("husker hvem som er logget inn etter omstart, og glemmer det ved logg ut", async () => {
  await saveSession("u1");
  const app = await renderRouter("src/app", { initialUrl: "/" });

  await waitFor(() => expect(app.getPathname()).toBe("/tenantHome"));

  await fireEvent.press(await screen.findByText("Logg ut"));
  await waitFor(() => expect(app.getPathname()).toBe("/"));
  expect(await readSession()).toBeNull();
});
