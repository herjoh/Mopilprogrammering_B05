import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

import { CaseRegister } from "../CaseRegister";

it("viser feil og sender ikke inn uten tittel", () => {
  const onSubmit = jest.fn();
  render(<CaseRegister onSubmit={onSubmit} />);
  fireEvent.press(screen.getByText("Send inn"));
  expect(screen.getByText("Tittel kan ikke være tom")).toBeTruthy();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("sender inn det som er skrevet og tømmer skjemaet", async () => {
  const onSubmit = jest.fn().mockResolvedValue(undefined);
  render(<CaseRegister onSubmit={onSubmit} />);
  const tittel = screen.getByPlaceholderText("Ovnen funker ikke...");
  fireEvent.changeText(tittel, "Knust vindu");
  fireEvent.changeText(screen.getByPlaceholderText(/prøvd å skru den av/), "Vinduet på badet er knust.");
  fireEvent.press(screen.getByText("Send inn"));
  await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ title: "Knust vindu", description: "Vinduet på badet er knust.", category: "complaint", severity: "low" }),
  );
  expect(tittel.props.value).toBe("");
});

it("viser meldingen når innsending feiler", async () => {
  const onSubmit = jest.fn().mockRejectedValue(new Error("Eiendom mangler"));
  render(<CaseRegister onSubmit={onSubmit} />);
  fireEvent.changeText(screen.getByPlaceholderText("Ovnen funker ikke..."), "Knust vindu");
  fireEvent.changeText(screen.getByPlaceholderText(/prøvd å skru den av/), "Vinduet på badet er knust.");
  fireEvent.press(screen.getByText("Send inn"));
  expect(await screen.findByText("Eiendom mangler")).toBeTruthy();
});
