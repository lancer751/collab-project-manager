import { isAuthenticated as authCheck, login, logout } from "@/services/auth";
import { UserLoginData } from "@/types/user.types";
import { User } from "@/types/user.types";
import {
  createContext,
  ReactNode,
  useCallback,
  useState,
} from "react";

export interface AuthContext {
  isAuthenticated: () => Promise<User | null>;
  loginUser: (userData: UserLoginData) => Promise<User>;
  logoutSession: () => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = useCallback(async () => {
    const user = await authCheck()
    setUser(user)
    return user
  }, [])

  const loginUser = useCallback(
    async (userData:UserLoginData) => {
      const authUser = await login(userData);
      setUser(authUser)
      return authUser
    },
    []
  );

  const logoutSession = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loginUser, logoutSession, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
