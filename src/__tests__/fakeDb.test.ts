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
  deleteCase,
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

test("deleteCase fjerner en sak og gir den tilbake", async () => {
  const deleted = await deleteCase("2");
  expect(deleted?.title).toBe("Stikkontakt på soverommet virker ikke");
  expect(await getCases()).toHaveLength(2);
  expect(await getCase("2")).toBeUndefined();
});

test("deleteCase gir undefined for ukjent id", async () => {
  expect(await deleteCase("finnes-ikke")).toBeUndefined();
  expect(await getCases()).toHaveLength(3);
});

test("createCase etter deleteCase gir ny unik id", async () => {
  await deleteCase("2");
  const created = await createCase({
    title: "Dørlås henger",
    description: "Nøkkelen går tungt i låsen.",
    category: "other",
    severity: "low",
    tenantId: "u1",
    propertyId: "p1",
  });
  const ids = (await getCases()).map((c) => c.id);
  expect(ids).toContain(created.id);
  expect(new Set(ids).size).toBe(ids.length);
});
