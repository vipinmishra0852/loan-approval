"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  username: string;
  userType: "Admin" | "Verifier" | "User";
  name: string;
}

interface UserContextType {
  user: User | null;
  login: (
    username: string,
    password: string,
    userType: "Admin" | "Verifier" | "User"
  ) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (
    username: string,
    password: string,
    userType: "Admin" | "Verifier" | "User"
  ): boolean => {
    // Hardcoded credentials for demo
    const validCredentials = [
      {
        username: "admin@1",
        password: "12345",
        userType: "Admin",
        name: "John Doe",
      },
      {
        username: "verifier@1",
        password: "12345",
        userType: "Verifier",
        name: "John Okoh",
      },
      {
        username: "user@1",
        password: "12345",
        userType: "User",
        name: "Jane Smith",
      },
    ];

    const foundUser = validCredentials.find(
      (cred) =>
        cred.username === username &&
        cred.password === password &&
        cred.userType === userType
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        userType: foundUser.userType,
        name: foundUser.name,
      } as User;

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
