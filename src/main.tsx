import "./lib/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


// 🔒 PAKSA LIGHT MODE
document.documentElement.classList.remove("dark");
localStorage.removeItem("theme");

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
