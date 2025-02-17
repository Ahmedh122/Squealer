import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };
const logout = async () => {
  try {
    // Add 'await' to wait for the promise to resolve
    await axios.post("http://localhost:8800/api/auth/logout", null, {
      withCredentials: true,
    });
    setCurrentUser(null);
    localStorage.removeItem("user");
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};