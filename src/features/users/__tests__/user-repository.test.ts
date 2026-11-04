import { createMemoryDb, type DbAccess } from "@/data/db";

import { createUserRepository, type UserRepository } from "../user-repository";

let db: DbAccess;
let repo: UserRepository;

beforeEach(() => {
  db = createMemoryDb();
  repo = createUserRepository(db);
});

it("list gir alle brukere, eller bare én rolle", async () => {
  const alle = await repo.list();
  expect(alle.success && alle.data).toHaveLength(2);
  const utleiere = await repo.list({ role: "Landlord" });
  expect(utleiere.success && utleiere.data.map((u) => u.id)).toEqual(["u2"]);
});

it("get finner en bruker og gir 404 for ukjent", async () => {
  const found = await repo.get("u1");
  expect(found.success && found.data.name).toBe("Kari Leietaker");
  expect(await repo.get("u99")).toMatchObject({ success: false, code: 404 });
});

it("getByEmail finner uansett store/små bokstaver og gir 404 for ukjent", async () => {
  const found = await repo.getByEmail("  KARI@fiksa.no ");
  expect(found.success && found.data.id).toBe("u1");
  expect(await repo.getByEmail("ingen@fiksa.no")).toMatchObject({ success: false, code: 404 });
});

it("create registrerer en bruker med ny id og lagrer", async () => {
  const result = await repo.create({ name: "Per Leietaker", email: "per@fiksa.no", password: "test1234", role: "Tenant" });
  expect(result.success).toBe(true);
  if (!result.success) return;
  expect(result.data.id).toBeTruthy();
  expect(result.data.id).not.toBe("u1");
  expect((await db.load()).users).toHaveLength(3);
});
