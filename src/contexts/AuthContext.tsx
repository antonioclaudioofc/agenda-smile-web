import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/http";

interface User {
  id: string;
  email: string;
  first_name: string;
  username?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token"),
  );

  const { data: userProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/accounts/me/");
      return response.data;
    },
    enabled: !!token,
  });

  const user = userProfile || null;

  function login(data: any) {
    const extractedToken = data.token || data.access || data.access_token;
    const extractedRefreshToken = data.refresh || data.refresh_token;

    if (extractedToken) {
      localStorage.setItem("access_token", extractedToken);
      setToken(extractedToken);
    }

    if (extractedRefreshToken) {
      localStorage.setItem("refresh_token", extractedRefreshToken);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    queryClient.removeQueries({ queryKey: ["profile"] });
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
