import { isAuthenticated as authCheck, login, logout } from "@/services/auth";
import { UserLoginData } from "@/types/auth.types";
import { User } from "@/types/user.types";
import {
  createContext,
  ReactNode,
  useCallback,
  useState,
} from "react";

export interface AuthContext {
  isAuthenticated: () => Promise<User | null>;
  loginUser: (userData: UserLoginData) => Promise<void>;
  logoutSession: () => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  console.log(user);

  const isAuthenticated = useCallback(async () => {
    const user = await authCheck()
    setUser(user)
    return user
  }, [])

  const loginUser = useCallback(
    async (userData:UserLoginData) => {
      await login(userData);
    },
    []
  );

  const logoutSession = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loginUser, logoutSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}
