import { createMemoryDb, type DbAccess } from "@/data/db";

import { createCaseRepository, type CaseRepository } from "../case-repository";

let db: DbAccess;
let repo: CaseRepository;

beforeEach(() => {
  db = createMemoryDb();
  repo = createCaseRepository(db);
});

const nySak = {
  title: "Knust vindu",
  description: "Vinduet på badet er knust.",
  status: "open",
  category: "other",
  severity: "high",
  tenantId: "u1",
  propertyId: "p1",
} as const;

describe("caseRepository.list", () => {
  it("uten filter gir alle sakene", async () => {
    const result = await repo.list();
    expect(result.success && result.data).toHaveLength(3);
  });

  it("filtrerer på status, kategori og hastegrad", async () => {
    const status = await repo.list({ status: "closed" });
    expect(status.success && status.data.map((c) => c.id)).toEqual(["3"]);
    const kategori = await repo.list({ category: "water" });
    expect(kategori.success && kategori.data.map((c) => c.id)).toEqual(["1"]);
    const hastegrad = await repo.list({ severity: "medium" });
    expect(hastegrad.success && hastegrad.data.map((c) => c.id)).toEqual(["2"]);
    const kombinert = await repo.list({ status: "open", category: "heating" });
    expect(kombinert.success && kombinert.data).toHaveLength(0);
  });

  it("filtrerer på leietaker, eiendom og utleier", async () => {
    const leietaker = await repo.list({ tenantId: "u1" });
    expect(leietaker.success && leietaker.data).toHaveLength(3);
    const ukjentLeietaker = await repo.list({ tenantId: "ukjent" });
    expect(ukjentLeietaker.success && ukjentLeietaker.data).toHaveLength(0);
    const eiendom = await repo.list({ propertyId: "p1" });
    expect(eiendom.success && eiendom.data).toHaveLength(3);
    const utleier = await repo.list({ landlordId: "u2" });
    expect(utleier.success && utleier.data).toHaveLength(3);
    const annenUtleier = await repo.list({ landlordId: "u1" });
    expect(annenUtleier.success && annenUtleier.data).toHaveLength(0);
  });
});

describe("caseRepository.get", () => {
  it("finner en sak på id og gir 404 for ukjent", async () => {
    const found = await repo.get("1");
    expect(found.success && found.data.title).toBe("Lekkasje under kjøkkenvasken");
    expect(await repo.get("finnes-ikke")).toMatchObject({ success: false, code: 404 });
  });
});

describe("caseRepository.create", () => {
  it("gir id og createdAt og lagrer", async () => {
    const result = await repo.create(nySak);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toMatchObject(nySak);
    expect(result.data.id).toBeTruthy();
    expect(new Date(result.data.createdAt).getTime()).not.toBeNaN();
    expect((await db.load()).cases).toHaveLength(4);
  });

  it("gir unike id-er, også etter sletting", async () => {
    await repo.remove("2");
    const a = await repo.create(nySak);
    const b = await repo.create(nySak);
    const list = await repo.list();
    const ids = list.success ? list.data.map((c) => c.id) : [];
    expect(new Set(ids).size).toBe(4);
    expect(a.success && b.success && a.data.id !== b.data.id).toBe(true);
  });
});

describe("caseRepository.update", () => {
  it("endrer feltene og lagrer, id og createdAt beholdes", async () => {
    const result = await repo.update("1", { status: "closed", id: "hacket", createdAt: "nå" } as never);
    expect(result.success && result.data).toMatchObject({ id: "1", status: "closed", createdAt: "2026-09-28T10:00:00.000Z" });
    const lagret = await repo.get("1");
    expect(lagret.success && lagret.data.status).toBe("closed");
  });

  it("gir 404 for ukjent id", async () => {
    expect(await repo.update("finnes-ikke", { status: "closed" })).toMatchObject({ success: false, code: 404 });
  });
});

describe("caseRepository.remove", () => {
  it("fjerner saken og gir den tilbake", async () => {
    const result = await repo.remove("2");
    expect(result.success && result.data.title).toBe("Stikkontakt på soverommet virker ikke");
    expect(await repo.get("2")).toMatchObject({ success: false, code: 404 });
    expect((await db.load()).cases.map((c) => c.id)).toEqual(["1", "3"]);
  });

  it("gir 404 for ukjent id", async () => {
    expect(await repo.remove("finnes-ikke")).toMatchObject({ success: false, code: 404 });
  });
});

describe("når lagringen feiler", () => {
  it("gir 500 i stedet for å kaste", async () => {
    const brokenDb: DbAccess = {
      load: async () => {
        throw new Error("disk full");
      },
      save: () => {},
    };
    const brokenRepo = createCaseRepository(brokenDb);
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(await brokenRepo.list()).toMatchObject({ success: false, code: 500 });
    expect(await brokenRepo.create(nySak)).toMatchObject({ success: false, code: 500 });
    spy.mockRestore();
  });
});
