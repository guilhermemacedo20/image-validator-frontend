import { createContext, useContext, useEffect, useState } from "react";

import {
  clearSession,
  fetchCurrentUser,
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  persistTokens,
  registerRequest,
  resetPasswordRequest,
} from "@/infrastructure/services/authService";
import type {
  AuthContextData,
  AuthProviderProps,
  LoginResponse,
  User,
} from "@/types/auth.types";

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const completeLogin = async (payload: {
    accessToken: string;
    refreshToken: string;
  }) => {
    persistTokens(payload);
    await fetchUser();
    return { success: true };
  };

  const login = async (
    email: string,
    password: string,
    twoFactorCode: string | null = null,
    twoFactorToken: string | null = null,
  ): Promise<LoginResponse> => {
    const body: Record<string, unknown> = {};

    if (twoFactorToken) {
      body.twoFactorToken = twoFactorToken;
      body.twoFactorCode = twoFactorCode;
    } else {
      body.email = email;
      body.password = password;

      if (twoFactorCode) {
        body.twoFactorCode = twoFactorCode;
      }
    }

    const res = await loginRequest(body);

    if (res.data.requiresTwoFactor) {
      return {
        requiresTwoFactor: true,
        twoFactorToken: res.data.twoFactorToken,
      };
    }

    return completeLogin(res.data);
  };

  const register = async (
    email: string,
    password: string,
    consent: boolean,
  ) => {
    return registerRequest(email, password, consent);
  };

  const logout = async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await logoutRequest(refreshToken);
    } catch {
      /* sessão local limpa mesmo se o backend falhar */
    }

    clearSession();
    setUser(null);
    window.location.href = "/";
  };

  const forgotPassword = async (email: string) => {
    return forgotPasswordRequest(email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    return resetPasswordRequest(token, newPassword);
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve estar dentro do AuthProvider");
  }

  return context;
};
