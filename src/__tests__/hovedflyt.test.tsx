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

import { fireEvent, waitFor } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

it("logg inn, meld inn en sak, se den i lista", async () => {
  const app = renderRouter("src/app", { initialUrl: "/login" });

  fireEvent.changeText(await screen.findByPlaceholderText("Skriv inn e-post"), "kari@fiksa.no");
  fireEvent.changeText(screen.getByPlaceholderText("Skriv inn passord"), "kari1234");
  const [, loggInnKnapp] = screen.getAllByText("Logg inn");
  fireEvent.press(loggInnKnapp);

  await waitFor(() => expect(app.getPathname()).toBe("/tenantHome"));
  expect(await screen.findByText("Lekkasje under kjøkkenvasken")).toBeTruthy();

  fireEvent.changeText(screen.getByPlaceholderText("Ovnen funker ikke..."), "Knust vindu");
  fireEvent.changeText(screen.getByPlaceholderText(/prøvd å skru den av/), "Vinduet på badet er knust.");
  fireEvent.press(screen.getByText("Send inn"));

  expect(await screen.findByText("Knust vindu")).toBeTruthy();
  expect(screen.getByText("Vinduet på badet er knust.")).toBeTruthy();
});
