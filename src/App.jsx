

import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import MainLoyaut from "./loyauts/MainLoyaut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./context/ThemeContext";
import Errorpages from "./pages/Errorpages";
import { useAppStore } from "./zustand";

function App() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!user && currentPath !== "/register") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <ThemeProvider>
      {user ? (
        <Routes>
          <Route
            path="/"
            element={
              <MainLoyaut>
                <Home />
              </MainLoyaut>
            }
          />
          <Route
            path="*"
            element={
              <MainLoyaut>
                <Errorpages />
              </MainLoyaut>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
