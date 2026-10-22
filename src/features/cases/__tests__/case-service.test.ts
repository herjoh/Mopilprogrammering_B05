import type { User } from "@/constants/types";
import { createMemoryDb } from "@/data/db";
import { createPropertyRepository } from "@/features/properties/property-repository";

import { createCaseRepository } from "../case-repository";
import { createCaseService, type CaseService } from "../case-service";

const kari: User = { id: "u1", name: "Kari Leietaker", role: "tenant" };
const ola: User = { id: "u2", name: "Ola Utleier", role: "landlord" };
const per: User = { id: "u3", name: "Per Leietaker", role: "tenant" };
const annenUtleier: User = { id: "u4", name: "Anne Utleier", role: "landlord" };
const admin: User = { id: "u9", name: "Admin", role: "ADMIN" };

const gyldig = {
  title: "Knust vindu",
  description: "Vinduet på badet er knust.",
  category: "other",
  severity: "high",
  propertyId: "p1",
};

let service: CaseService;

beforeEach(() => {
  const db = createMemoryDb();
  service = createCaseService(createCaseRepository(db), createPropertyRepository(db));
});

describe("caseService.create", () => {
  it("returnerer fieldErrors ved ugyldig input", async () => {
    const result = await service.create(kari, { title: "ab", description: "", category: "pizza", severity: "high" });
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.code).toBe(400);
    expect(result.fieldErrors?.title).toEqual(["Tittelen må ha minst 3 tegn"]);
    expect(result.fieldErrors?.description).toEqual(["Beskrivelsen kan ikke være tom"]);
    expect(result.fieldErrors?.category).toEqual(["Velg en gyldig kategori"]);
    expect(result.fieldErrors?.propertyId).toEqual(["Eiendom mangler"]);
    expect(result.fieldErrors?.severity).toBeUndefined();
  });

  it("lagrer og returnerer saken ved gyldig input", async () => {
    const result = await service.create(kari, gyldig);
    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data).toMatchObject({ ...gyldig, tenantId: "u1", status: "open" });
    expect(result.data.id).toBeTruthy();
    expect(result.data.createdAt).toBeTruthy();
    const list = await service.list(kari);
    expect(list.success && list.data).toHaveLength(4);
  });

  it("setter tenantId fra innlogget bruker, ikke fra input", async () => {
    const result = await service.create(kari, { ...gyldig, tenantId: "u2", status: "closed" });
    expect(result.success && result.data.tenantId).toBe("u1");
    expect(result.success && result.data.status).toBe("open");
  });

  it("avviser eiendom som ikke finnes", async () => {
    const result = await service.create(kari, { ...gyldig, propertyId: "p99" });
    expect(result).toMatchObject({ success: false, code: 400, fieldErrors: { propertyId: ["Eiendommen finnes ikke"] } });
  });

  it("avviser utleier", async () => {
    const result = await service.create(ola, gyldig);
    expect(result).toMatchObject({ success: false, code: 403 });
  });
});

describe("caseService.list og get", () => {
  it("leietaker ser bare egne saker", async () => {
    await service.create(per, gyldig);
    const karis = await service.list(kari);
    expect(karis.success && karis.data).toHaveLength(3);
    const persSaker = await service.list(per);
    expect(persSaker.success && persSaker.data.map((c) => c.tenantId)).toEqual(["u3"]);
  });

  it("utleier ser sakene på egne eiendommer", async () => {
    await service.create(per, gyldig);
    const olas = await service.list(ola);
    expect(olas.success && olas.data).toHaveLength(4);
    const annes = await service.list(annenUtleier);
    expect(annes.success && annes.data).toHaveLength(0);
  });

  it("admin ser alle", async () => {
    await service.create(per, gyldig);
    const alle = await service.list(admin);
    expect(alle.success && alle.data).toHaveLength(4);
  });

  it("get gir 404 for ukjent sak og 403 for andres sak", async () => {
    expect(await service.get(kari, "finnes-ikke")).toMatchObject({ success: false, code: 404 });
    expect(await service.get(per, "1")).toMatchObject({ success: false, code: 403 });
    expect(await service.get(annenUtleier, "1")).toMatchObject({ success: false, code: 403 });
    expect((await service.get(kari, "1")).success).toBe(true);
    expect((await service.get(ola, "1")).success).toBe(true);
  });
});

describe("caseService.update", () => {
  it("leietaker kan endre beskrivelse, men ikke status", async () => {
    const ok = await service.update(kari, "1", { description: "Det drypper mer nå." });
    expect(ok.success && ok.data.description).toBe("Det drypper mer nå.");
    const nei = await service.update(kari, "1", { status: "closed" });
    expect(nei).toMatchObject({ success: false, code: 403 });
    const etterpaa = await service.get(kari, "1");
    expect(etterpaa.success && etterpaa.data.status).toBe("open");
  });

  it("utleier kan sette status, men ikke tittel", async () => {
    const ok = await service.update(ola, "1", { status: "in progress" });
    expect(ok.success && ok.data.status).toBe("in progress");
    const nei = await service.update(ola, "1", { title: "Noe annet" });
    expect(nei).toMatchObject({ success: false, code: 403 });
  });

  it("gir fieldErrors ved ugyldig status og 400 uten endringer", async () => {
    const result = await service.update(ola, "1", { status: "ferdig" });
    expect(result).toMatchObject({ success: false, code: 400, fieldErrors: { status: ["Ugyldig status"] } });
    expect(await service.update(ola, "1", {})).toMatchObject({ success: false, code: 400 });
  });

  it("andres sak gir 403", async () => {
    expect(await service.update(per, "1", { title: "Min nå" })).toMatchObject({ success: false, code: 403 });
  });
});

describe("caseService.remove", () => {
  it("leietaker kan slette egen åpen sak", async () => {
    const result = await service.remove(kari, "1");
    expect(result.success && result.data.id).toBe("1");
    const list = await service.list(kari);
    expect(list.success && list.data.map((c) => c.id)).toEqual(["2", "3"]);
  });

  it("leietaker kan ikke slette sak under arbeid", async () => {
    expect(await service.remove(kari, "2")).toMatchObject({ success: false, code: 403 });
  });

  it("utleier kan slette sak på egen eiendom", async () => {
    expect((await service.remove(ola, "2")).success).toBe(true);
    expect(await service.remove(annenUtleier, "3")).toMatchObject({ success: false, code: 403 });
  });

  it("ukjent id gir 404", async () => {
    expect(await service.remove(kari, "finnes-ikke")).toMatchObject({ success: false, code: 404 });
  });
});
