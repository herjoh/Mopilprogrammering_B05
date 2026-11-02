const KEY = "fiksa-session";

export async function readSession() {
  return localStorage.getItem(KEY);
}

export async function saveSession(userId: string) {
  localStorage.setItem(KEY, userId);
}

export async function clearSession() {
  localStorage.removeItem(KEY);
}
