import { createId, jsonDb, type DbAccess } from "@/data/db";
import { failure, success, type Result } from "@/types/resultTypes";
import type { Role, User } from "@/types/types";

export type UserInsert = Omit<User, "id">;
export type UserFilter = { role?: Role };

export interface UserRepository {
  list(filter?: UserFilter): Promise<Result<User[]>>;
  get(id: string): Promise<Result<User>>;
  getByEmail(email: string): Promise<Result<User>>;
  create(data: UserInsert): Promise<Result<User>>;
}

const STORAGE_ERROR = "Noe gikk galt med lagringen";

export function createUserRepository(db: DbAccess): UserRepository {
  return {
    async list(filter = {}) {
      try {
        const data = await db.load();
        return success(data.users.filter((u) => filter.role === undefined || u.role === filter.role));
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async get(id) {
      try {
        const data = await db.load();
        const found = data.users.find((u) => u.id === id);
        return found ? success(found) : failure("Brukeren finnes ikke", 404);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async getByEmail(email) {
      try {
        const data = await db.load();
        const wanted = email.trim().toLowerCase();
        const found = data.users.find((u) => u.email.toLowerCase() === wanted);
        return found ? success(found) : failure("Brukeren finnes ikke", 404);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },

    async create(input) {
      try {
        const data = await db.load();
        const user: User = { ...input, id: createId() };
        data.users.push(user);
        await db.save(data);
        return success(user);
      } catch (error) {
        console.error(error);
        return failure(STORAGE_ERROR, 500);
      }
    },
  };
}

export const userRepository = createUserRepository(jsonDb);
