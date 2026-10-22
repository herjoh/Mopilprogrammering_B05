import type { Case, User } from "@/constants/types";
import { propertyRepository, type PropertyRepository } from "@/features/properties/property-repository";
import { failure, type Result } from "@/providers/resultTypes";

import { caseRepository, type CaseRepository, type CaseUpdate } from "./case-repository";
import { createCaseSchema, fieldErrorsOf, updateCaseSchema } from "./case-validator";

// her ligger reglene: validering og hvem som får gjøre hva, så kalles repository
// leietaker: egne saker, kan ikke sette status, kan slette så lenge saken er open
// utleier: saker på egne eiendommer, kan sette status og hastegrad, kan slette
// admin: alt

export interface CaseService {
  list(user: User): Promise<Result<Case[]>>;
  get(user: User, id: string): Promise<Result<Case>>;
  create(user: User, input: unknown): Promise<Result<Case>>;
  update(user: User, id: string, input: unknown): Promise<Result<Case>>;
  remove(user: User, id: string): Promise<Result<Case>>;
}

const tenantFields: readonly string[] = ["title", "description", "category", "severity"];
const landlordFields: readonly string[] = ["status", "severity"];

export function createCaseService(cases: CaseRepository, properties: PropertyRepository): CaseService {
  async function isParty(user: User, c: Case) {
    if (user.role === "ADMIN") return true;
    if (user.role === "tenant") return c.tenantId === user.id;
    const property = await properties.get(c.propertyId);
    return property.success && property.data.landlordId === user.id;
  }

  async function getIfAllowed(user: User, id: string): Promise<Result<Case>> {
    const found = await cases.get(id);
    if (!found.success) return found;
    if (!(await isParty(user, found.data))) return failure("Du har ikke tilgang til denne saken", 403);
    return found;
  }

  return {
    async list(user) {
      if (user.role === "tenant") return cases.list({ tenantId: user.id });
      if (user.role === "landlord") return cases.list({ landlordId: user.id });
      return cases.list();
    },

    get: getIfAllowed,

    async create(user, input) {
      if (user.role !== "tenant") return failure("Bare leietakere kan melde inn saker", 403);
      const parsed = createCaseSchema.safeParse(input);
      if (!parsed.success) return failure("Ugyldig data", 400, fieldErrorsOf(parsed.error));
      const property = await properties.get(parsed.data.propertyId);
      if (!property.success) return failure("Ugyldig data", 400, { propertyId: ["Eiendommen finnes ikke"] });
      return cases.create({ ...parsed.data, tenantId: user.id, status: "open" });
    },

    async update(user, id, input) {
      const existing = await getIfAllowed(user, id);
      if (!existing.success) return existing;
      const parsed = updateCaseSchema.safeParse(input);
      if (!parsed.success) return failure("Ugyldig data", 400, fieldErrorsOf(parsed.error));
      // bare feltene som ble sendt inn
      const changes = Object.fromEntries(Object.entries(parsed.data).filter(([, v]) => v !== undefined)) as CaseUpdate;
      const keys = Object.keys(changes);
      if (keys.length === 0) return failure("Ingenting å endre", 400);
      if (user.role === "tenant" && keys.some((k) => !tenantFields.includes(k))) {
        return failure("Leietaker kan ikke endre status", 403);
      }
      if (user.role === "landlord" && keys.some((k) => !landlordFields.includes(k))) {
        return failure("Utleier kan bare endre status og hastegrad", 403);
      }
      return cases.update(id, changes);
    },

    async remove(user, id) {
      const existing = await getIfAllowed(user, id);
      if (!existing.success) return existing;
      if (user.role === "tenant" && existing.data.status !== "open") {
        return failure("Saken er under behandling og kan ikke slettes", 403);
      }
      return cases.remove(id);
    },
  };
}

export const caseService = createCaseService(caseRepository, propertyRepository);
