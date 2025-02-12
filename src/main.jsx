import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // Reemplazar por una función más útil
  user: null,
  setUser: () => {}, // Lo mismo aquí
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
