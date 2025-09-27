import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: any;
}>({
  isAuthenticated: false,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
