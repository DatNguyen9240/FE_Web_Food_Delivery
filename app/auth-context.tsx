import { createContext, useContext } from "react";
import type { User } from "../types/Auth";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
}>({
  isAuthenticated: false,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
