
// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface AuthContextType {
//   // userId: number | null;
//   username: string | null;
//   token: string | null;
//   role: string | null;
//   isLoggedIn: boolean;
//   login: ( username: string, token: string, role: string) => void;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [username, setUsername] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   // const [userId, setUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('username');
//     const storedToken = localStorage.getItem('token');
//     const storedRole = localStorage.getItem('role');
//     if (storedUser && storedToken && storedRole) {
//       setUsername(storedUser);
//       setToken(storedToken);
//       setRole(storedRole);
//     }
//   }, []);

//   const login = ( username: string, token: string, role: string) => {
//     // localStorage.setItem('userId', String(userId));
//     localStorage.setItem('username', username);
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//     setUsername(username);
//     setToken(token);
//     setRole(role);
//   };

//   const logout = () => {
//     localStorage.removeItem('username');
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setUsername(null);
//     setToken(null);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ username, token, role, isLoggedIn: !!token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  userId: number | null;
  username: string | null;
  token: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (userId: number, username: string, token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUserId) setUserId(Number(storedUserId));
    if (storedUsername) setUsername(storedUsername);
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (userId: number, username: string, token: string, role: string) => {
    localStorage.setItem('userId', String(userId));
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setUserId(userId);
    setUsername(username);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUserId(null);
    setUsername(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ userId, username, token, role, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
