import type { Case, Property, User } from "@/types/types";

import { readText, writeText } from "./storage";

// hele databasen er ett json-dokument, lagret via storage.ts / storage.web.ts
export type Db = { users: User[]; properties: Property[]; cases: Case[] };

// det et repository trenger: lese og skrive hele dokumentet
export type DbAccess = {
  load: () => Promise<Db>;
  save: (db: Db) => void | Promise<void>;
};

export function seed(): Db {
  return {
    users: [
      { id: "u1", name: "Kari Leietaker", role: "Tenant" },
      { id: "u2", name: "Ola Utleier", role: "Landlord" },
    ],
    properties: [{ id: "p1", address: "Storgata 1, Halden", landlordId: "u2" }],
    cases: [
      {
        id: "1",
        title: "Lekkasje under kjøkkenvasken",
        description: "Det drypper fra røret under vasken.",
        status: "open",
        category: "water",
        severity: "high",
        tenantId: "u1",
        propertyId: "p1",
        createdAt: "2026-09-28T10:00:00.000Z",
      },
      {
        id: "2",
        title: "Stikkontakt på soverommet virker ikke",
        description: "Ingen strøm i kontakten ved sengen.",
        status: "in progress",
        category: "electricity",
        severity: "medium",
        tenantId: "u1",
        propertyId: "p1",
        createdAt: "2026-09-30T14:30:00.000Z",
      },
      {
        id: "3",
        title: "Radiatoren i stua blir ikke varm",
        description: "Radiatoren er kald selv på full styrke.",
        status: "closed",
        category: "heating",
        severity: "low",
        tenantId: "u1",
        propertyId: "p1",
        createdAt: "2026-10-01T08:15:00.000Z",
      },
    ],
  };
}

async function saveDb(db: Db) {
  await writeText(JSON.stringify(db, null, 2));
}

// første gang finnes ingen fil, da lagres seed
async function loadDb(): Promise<Db> {
  const text = await readText();
  if (text !== undefined) return JSON.parse(text);
  const db = seed();
  await saveDb(db);
  return db;
}

export const jsonDb: DbAccess = { load: loadDb, save: saveDb };

export function resetDb() {
  return saveDb(seed());
}

// til tester: samme som fila, bare i minnet. load gir en kopi, så endringer teller først etter save
export function createMemoryDb(initial: Db = seed()): DbAccess {
  let current = clone(initial);
  return {
    load: async () => clone(current),
    save: (db) => {
      current = clone(db);
    },
  };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// enkel id uten ny pakke (forelesningen bruker nanoid)
export function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
