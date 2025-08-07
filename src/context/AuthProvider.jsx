import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// **************************************************************
// HOOK PARA LLAMAR A ESTE CONTEXTO
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// ********************************************************************

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let user = null;

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        user = null;
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      setLoading(true);

      // Detecta si es un email o un userName
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, password }
        : { userName: identifier, password };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        payload,
        { withCredentials: true }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("sessionActive", "true");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null); // Limpiar el usuario al hacer logout
    localStorage.removeItem("sessionActive");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
