import * as SecureStore from "expo-secure-store";

const KEY = "fiksa-session";

export function readSession() {
  return SecureStore.getItemAsync(KEY);
}

export function saveSession(userId: string) {
  return SecureStore.setItemAsync(KEY, userId);
}

export function clearSession() {
  return SecureStore.deleteItemAsync(KEY);
}
