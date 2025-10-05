import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    return token
      ? { token, role, userId, username }
      : { token: null, role: null, userId: null, username: null };
  });

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
