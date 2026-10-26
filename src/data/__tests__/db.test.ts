import { createId, createMemoryDb, seed } from "../db";

// jest flytter mock over importene selv
jest.mock("expo-file-system", () => ({ File: class {}, Paths: { document: "mock://document" } }));

it("createId gir unike id-er", () => {
  const ids = new Set(Array.from({ length: 1000 }, () => createId()));
  expect(ids.size).toBe(1000);
});

it("createMemoryDb starter med seed og gir kopier", async () => {
  const db = createMemoryDb();
  const first = await db.load();
  expect(first).toEqual(seed());
  first.cases.push({ ...first.cases[0], id: "x" });
  expect((await db.load()).cases).toHaveLength(3);
  db.save(first);
  expect((await db.load()).cases).toHaveLength(4);
});
