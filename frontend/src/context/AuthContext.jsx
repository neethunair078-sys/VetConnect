import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken") || null;
  });

  const login = async (userData) => {
    const data = await loginUser(userData);

    setUser(data.user);
    setAccessToken(data.access);
    setRefreshToken(data.refresh);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    return data;
  };

  const updateUser = (updatedUserData) => {
    setUser((currentUser) => {
      const updatedUser = {
        ...currentUser,
        ...updatedUserData,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const logout = async () => {
    try {
      if (accessToken && refreshToken) {
        await logoutUser(refreshToken, accessToken);
      }
    } catch (error) {
      console.error(
        "Logout API failed:",
        error.response?.data || error.message,
      );
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
