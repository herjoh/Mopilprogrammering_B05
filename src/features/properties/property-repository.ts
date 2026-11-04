import { jsonDb, type DbAccess } from "@/data/db";
import { failure, success, type Result } from "@/types/resultTypes";
import type { Property } from "@/types/types";

export type PropertyFilter = { landlordId?: string };

export interface PropertyRepository {
  list(filter?: PropertyFilter): Promise<Result<Property[]>>;
  get(id: string): Promise<Result<Property>>;
}

const STORAGE_ERROR = "Noe gikk galt med lagringen";

export function createPropertyRepository(db: DbAccess): PropertyRepository {
  return {
    async list(filter = {}) {
      try {
        const data = await db.load();
        return success(data.properties.filter((p) => filter.landlordId === undefined || p.landlordId === filter.landlordId));
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async get(id) {
      try {
        const data = await db.load();
        const found = data.properties.find((p) => p.id === id);
        return found ? success(found) : failure("Eiendommen finnes ikke", 404);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },
  };
}

export const propertyRepository = createPropertyRepository(jsonDb);
