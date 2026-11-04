import { failure, success, type Result } from "@/types/resultTypes";
import type { User } from "@/types/types";

import { userRepository, type UserRepository } from "./user-repository";

export interface UserService {
  login(email: string, password: string): Promise<Result<User>>;
}

const WRONG_LOGIN = "Feil e-post eller passord";

export function createUserService(users: UserRepository): UserService {
  return {
    async login(email, password) {
      if (!email.trim() || !password) return failure("Fyll ut både e-post og passord", 400);
      const found = await users.getByEmail(email);
      if (!found.success) return found.code === 404 ? failure(WRONG_LOGIN, 401) : found;
      if (found.data.password !== password) return failure(WRONG_LOGIN, 401);
      return success(found.data);
    },
  };
}

export const userService = createUserService(userRepository);
