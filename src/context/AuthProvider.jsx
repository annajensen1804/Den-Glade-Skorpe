import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { serverPath } from "../settings";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async ({ email, password }) => {
    const res = await fetch(`${serverPath}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Forkert email eller adgangskode");

    const json = await res.json();
    const newToken =
      json?.data?.token;

    if (!newToken) throw new Error("Forkert email eller password / ingen token");

    localStorage.setItem("token", newToken);
    
    setToken(newToken);
    
    return newToken;
  };

  // Logger ud ved at fjerne token fra både state og localStorage.
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
