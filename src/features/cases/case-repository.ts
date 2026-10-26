import type { Case, CaseCategory, CaseSeverity, CaseStatus } from "@/constants/types";
import { createId, jsonDb, type DbAccess } from "@/data/db";
import { failure, success, type Result } from "@/providers/resultTypes";

// bare lagring, ingen regler (de ligger i case-service)

export type CaseInsert = Omit<Case, "id" | "createdAt">;
export type CaseUpdate = Partial<CaseInsert>;

// filter til list, feltene kan kombineres
export type CaseFilter = {
  tenantId?: string;
  propertyId?: string;
  landlordId?: string; // via utleierens eiendommer
  status?: CaseStatus;
  category?: CaseCategory;
  severity?: CaseSeverity;
};

export interface CaseRepository {
  list(filter?: CaseFilter): Promise<Result<Case[]>>;
  get(id: string): Promise<Result<Case>>;
  create(data: CaseInsert): Promise<Result<Case>>;
  update(id: string, changes: CaseUpdate): Promise<Result<Case>>;
  remove(id: string): Promise<Result<Case>>;
}

const STORAGE_ERROR = "Noe gikk galt med lagringen";
const NOT_FOUND = "Saken finnes ikke";

export function createCaseRepository(db: DbAccess): CaseRepository {
  return {
    async list(filter = {}) {
      try {
        const data = await db.load();
        const landlordProperties =
          filter.landlordId === undefined
            ? undefined
            : new Set(data.properties.filter((p) => p.landlordId === filter.landlordId).map((p) => p.id));
        const cases = data.cases.filter(
          (c) =>
            (filter.tenantId === undefined || c.tenantId === filter.tenantId) &&
            (filter.propertyId === undefined || c.propertyId === filter.propertyId) &&
            (filter.status === undefined || c.status === filter.status) &&
            (filter.category === undefined || c.category === filter.category) &&
            (filter.severity === undefined || c.severity === filter.severity) &&
            (landlordProperties === undefined || landlordProperties.has(c.propertyId)),
        );
        return success(cases);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async get(id) {
      try {
        const data = await db.load();
        const found = data.cases.find((c) => c.id === id);
        return found ? success(found) : failure(NOT_FOUND, 404);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async create(input) {
      try {
        const data = await db.load();
        const newCase: Case = { ...input, id: createId(), createdAt: new Date().toISOString() };
        data.cases.push(newCase);
        await db.save(data);
        return success(newCase);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async update(id, changes) {
      try {
        const data = await db.load();
        const existing = data.cases.find((c) => c.id === id);
        if (!existing) return failure(NOT_FOUND, 404);
        const updated: Case = { ...existing, ...changes, id, createdAt: existing.createdAt };
        data.cases = data.cases.map((c) => (c.id === id ? updated : c));
        await db.save(data);
        return success(updated);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async remove(id) {
      try {
        const data = await db.load();
        const existing = data.cases.find((c) => c.id === id);
        if (!existing) return failure(NOT_FOUND, 404);
        data.cases = data.cases.filter((c) => c.id !== id);
        await db.save(data);
        return success(existing);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },
  };
}

export const caseRepository = createCaseRepository(jsonDb);
