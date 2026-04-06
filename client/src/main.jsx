import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";

createRoot(document.getElementById("root")).render(
  <LoaderProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LoaderProvider>
);
