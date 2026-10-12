import { validateDescription } from "../utils/validation";

describe("validateDescription", () => {
  it("godtar en vanlig beskrivelse", () => {
    expect(validateDescription("Vannlekkasje under kjøkkenvasken")).toEqual({ ok: true });
  });

  it("avviser en tom beskrivelse", () => {
    expect(validateDescription("").ok).toBe(false);
  });

  it("avviser en for lang beskrivelse", () => {
    expect(validateDescription("a".repeat(501)).ok).toBe(false);
  });
});
