import { api } from "@/infrastructure/http/client";
import type { LoginPayload, User } from "@/types/auth.types";

export async function loginRequest(body: Record<string, unknown>) {
  return api.post("/auth/login", body);
}

export async function registerRequest(
  email: string,
  password: string,
  consent: boolean,
) {
  return api.post("/auth/register", { email, password, consent });
}

export async function logoutRequest(refreshToken: string | null) {
  return api.post("/auth/logout", { refreshToken });
}

export async function forgotPasswordRequest(email: string) {
  return api.post("/auth/forgot-password", { email });
}

export async function resetPasswordRequest(token: string, newPassword: string) {
  return api.post("/auth/reset-password", { token, newPassword });
}

export async function fetchCurrentUser(): Promise<User> {
  const res = await api.get<{ user: User }>("/auth/me");
  return res.data.user;
}

export function persistTokens(payload: LoginPayload): void {
  localStorage.setItem("accessToken", payload.accessToken);
  localStorage.setItem("refreshToken", payload.refreshToken);
}

export function clearSession(): void {
  localStorage.clear();
}
