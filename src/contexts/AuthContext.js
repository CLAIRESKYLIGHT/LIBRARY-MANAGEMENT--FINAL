"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // Here you would typically validate the token with your backend
      // For now, we'll just set a mock user
      setUser({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin"
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful login
      const mockToken = "mock-jwt-token";
      localStorage.setItem("token", mockToken);
      setUser({
        id: 1,
        name: "John Doe",
        email: email,
        role: "admin"
      });
      router.push("/books");
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
