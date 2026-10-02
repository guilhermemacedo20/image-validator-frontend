import type { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  consent?: boolean;
  consentDate?: string;
  twoFactorEnabled?: boolean;
}

export interface LoginPayload {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  requiresTwoFactor?: boolean;
  twoFactorToken?: string;
  success?: boolean;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    twoFactorCode?: string | null,
    twoFactorToken?: string | null,
  ) => Promise<LoginResponse>;
  register: (email: string, password: string, consent: boolean) => Promise<unknown>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  forgotPassword: (email: string) => Promise<unknown>;
  resetPassword: (token: string, newPassword: string) => Promise<unknown>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
