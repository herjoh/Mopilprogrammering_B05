// de gamle funksjonene, beholdt så AuthContext og CasePage virker. nytt bruker features/
import type { Case, NewCase, Role, User } from "@/constants/types";
import { caseRepository } from "@/features/cases/case-repository";
import { propertyRepository } from "@/features/properties/property-repository";
import { userRepository } from "@/features/users/user-repository";
import type { Result } from "@/providers/resultTypes";

export { resetDb } from "./db";

export async function getUsers() {
  const result = await userRepository.list();
  return result.success ? result.data : [];
}

export async function getUser(id: string) {
  const result = await userRepository.get(id);
  return result.success ? result.data : undefined;
}

export async function getUserRole(id: string): Promise<Result<Role>> {
  const user = await getUser(id);
  if (!user) return { success: false, error: "Error" };
  return { success: true, data: user.role };
}

export async function getUserWithRole(id: string): Promise<Result<{ user: User; role: Role }>> {
  const user = await getUser(id);
  if (!user) return { success: false, error: "User with id not found" };
  return { success: true, data: { user, role: user.role } };
}

export async function getUserResult(id: string): Promise<Result<User>> {
  return userRepository.get(id);
}

export async function getProperties() {
  const result = await propertyRepository.list();
  return result.success ? result.data : [];
}

export async function getProperty(id: string) {
  const result = await propertyRepository.get(id);
  return result.success ? result.data : undefined;
}

export async function getCases() {
  const result = await caseRepository.list();
  return result.success ? result.data : [];
}

export async function getCase(id: string) {
  const result = await caseRepository.get(id);
  return result.success ? result.data : undefined;
}

export async function createCase(input: NewCase) {
  const result = await caseRepository.create({ ...input, status: "open" });
  if (!result.success) throw new Error(result.error);
  return result.data;
}

export async function updateCase(id: string, changes: Partial<Omit<Case, "id">>) {
  const result = await caseRepository.update(id, changes);
  return result.success ? result.data : undefined;
}

export async function deleteCase(id: string) {
  const result = await caseRepository.remove(id);
  return result.success ? result.data : undefined;
}
