import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: string | null;
  role: "Patient" | "Admin" | null;
  login: (user: string, role: "Patient" | "Admin") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("user"));
  const [role, setRole] = useState<"Patient" | "Admin" | null>(() => (localStorage.getItem("role") as "Patient" | "Admin" | null));

  const login = (username: string, userRole: "Patient" | "Admin") => {
    setUser(username);
    setRole(userRole);
    localStorage.setItem("user", username);
    localStorage.setItem("role", userRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setRole(localStorage.getItem("role") as "Patient" | "Admin" | null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 