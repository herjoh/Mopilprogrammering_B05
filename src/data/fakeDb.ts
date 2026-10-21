import { readText, writeText } from "./storage";

import { type Case, type NewCase, type Property, type Role, type User } from "@/constants/types";
import { Result } from "@/providers/resultTypes";

type Db = { users: User[]; properties: Property[]; cases: Case[] };

function seed(): Db {
  return {
    users: [
      { id: "u1", name: "Kari Leietaker", role: "tenant" },
      { id: "u2", name: "Ola Utleier", role: "landlord" },
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

function save(db: Db) {
  writeText(JSON.stringify(db, null, 2));
}

async function load(): Promise<Db> {
  const text = await readText();
  if (text !== undefined) return JSON.parse(text);
  const db = seed();
  save(db);
  return db;
}

export async function getUsers() {
  return (await load()).users;
}

export async function getUser(id: string) {
  return (await load()).users.find((u) => u.id === id);
}

export async function getUserRole(id: string): Promise<Result<Role>>{
  const user = await getUser(id);
  if(!user) return {success: false, error: "Error"};
  return{success: true, data: user.role}
}

export async function getUserWithRole(id:string): Promise<Result<{user: User; role: Role}>> {
  const user = await getUser(id);
  if(!user) return{success: false, error: "User with id not found"};
  return{success: true, data: {user, role: user.role} };
}

export async function getUserResult(id: string): Promise<Result<User>>{
  const user = await getUser(id);
  return user ? {success: true, data: user} : {success: false, error: "User id not found"};
}

export async function getProperties() {
  return (await load()).properties;
}

export async function getProperty(id: string) {
  return (await load()).properties.find((p) => p.id === id);
}

export async function getCases() {
  return (await load()).cases;
}

export async function getCase(id: string) {
  return (await load()).cases.find((c) => c.id === id);
}

export async function createCase(input: NewCase) {
  const db = await load();
  const newCase: Case = {
    ...input,
    id: String(db.cases.length + 1),
    status: "open",
    createdAt: new Date().toISOString(),
  };
  db.cases.push(newCase);
  save(db);
  return newCase;
}

export async function updateCase(id: string, changes: Partial<Omit<Case, "id">>) {
  const db = await load();
  const existing = db.cases.find((c) => c.id === id);
  if (!existing) return undefined;
  const updated = { ...existing, ...changes };
  db.cases = db.cases.map((c) => (c.id === id ? updated : c));
  save(db);
  return updated;
}

export function resetDb() {
  save(seed());
}
