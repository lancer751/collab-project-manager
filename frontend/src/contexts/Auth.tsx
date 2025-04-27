import { isAuthenticated, login, logout } from "@/services/auth";
import { User } from "@/types/user.types";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  authUser: boolean;
  loginUser: (userData: { email: string; password: string }) => Promise<void>;
  logoutSession: () => Promise<void>;
  user: User | null;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const authUser = !!user

  useEffect(() => {
    const fetchUser = async () => {
      const user = await isAuthenticated();
      setUser(user);
    };

    fetchUser();
  }, []);

  const loginUser = useCallback(
    async (userData: { email: string; password: string }) => {
      const user = await login(userData);
      setUser(user);
    },
    []
  );

  const logoutSession = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, user, loginUser, logoutSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}
