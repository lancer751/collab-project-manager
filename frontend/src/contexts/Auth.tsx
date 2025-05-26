import { getMeAuthenticated, login, logoutSession } from "@/services/auth";
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
  login: (userData: UserLoginData) => Promise<User>;
  logoutSession: () => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = useCallback(async () => {
    const user = await getMeAuthenticated()
    setUser(user)
    return user
  }, [])


  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logoutSession, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
