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

import {
  createCase,
  getCase,
  getCases,
  getProperties,
  getUsers,
  resetDb,
  updateCase,
} from "../data/fakeDb";

beforeEach(resetDb);

test("getUsers og getProperties gir dummydata", async () => {
  expect(await getUsers()).toHaveLength(2);
  expect(await getProperties()).toHaveLength(1);
});

test("getCases gir alle sakene", async () => {
  expect(await getCases()).toHaveLength(3);
});

test("getCase finner en sak på id", async () => {
  expect((await getCase("1"))?.title).toBe("Lekkasje under kjøkkenvasken");
  expect(await getCase("finnes-ikke")).toBeUndefined();
});

test("createCase legger til en ny sak med status open", async () => {
  const created = await createCase({
    title: "Knust vindu",
    description: "Vinduet på badet er knust.",
    category: "other",
    severity: "high",
    tenantId: "u1",
    propertyId: "p1",
  });
  expect(created.status).toBe("open");
  expect(await getCases()).toHaveLength(4);
});

test("updateCase endrer status på en sak", async () => {
  const updated = await updateCase("1", { status: "closed" });
  expect(updated?.status).toBe("closed");
  expect((await getCase("1"))?.status).toBe("closed");
});
