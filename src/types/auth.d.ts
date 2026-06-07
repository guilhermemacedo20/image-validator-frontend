interface User {
  id: string
  email: string
  role?: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  consent?: boolean
  consentDate?: string
  twoFactorEnabled?: boolean
}

interface LoginPayload {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  requiresTwoFactor?: boolean;
  twoFactorToken?: string;
  success?: boolean;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;

  login: (
    email: string,
    password: string,
    twoFactorCode?: string | null,
    twoFactorToken?: string | null,
  ) => Promise<LoginResponse>;

  register: (email: string, password: string, consent: boolean) => Promise<any>;

  logout: () => Promise<void>;

  fetchUser: () => Promise<void>;

  forgotPassword: (email: string) => Promise<any>;

  resetPassword: (token: string, newPassword: string) => Promise<any>;
}

interface AuthProviderProps {
  children: ReactNode;
}