import { api } from "@/infrastructure/http/client";

export async function updateProfile(firstName: string, lastName: string) {
  return api.put("/user/profile", { firstName, lastName });
}

export async function setup2FA() {
  return api.post("/auth/2fa/setup");
}

export async function confirm2FA(token: string) {
  return api.post("/auth/2fa/confirm", { token });
}

export async function disable2FA() {
  return api.post("/auth/2fa/disable");
}

export async function exportUserData() {
  return api.get("/user/export");
}

export async function revokeConsent() {
  return api.post("/user/revoke-consent");
}

export async function deleteAccount() {
  return api.delete("/user");
}
