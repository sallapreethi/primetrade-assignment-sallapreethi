import { createContext, useContext, useEffect, useState } from "react";

type User = { id: number; name: string; email: string } | null;
type Ctx = { user: User; setUser: (u: User) => void; logout: () => void };

const AuthCtx = createContext<Ctx>({ user: null, setUser: () => {}, logout: () => {} });
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return <AuthCtx.Provider value={{ user, setUser, logout }}>{children}</AuthCtx.Provider>;
}