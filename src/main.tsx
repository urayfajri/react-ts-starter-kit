import React from "react";
import ReactDOM from "react-dom/client";
import { AppProviders } from "@/app/providers";
import App from "@/app/App";
import { ThemeProvider } from "@/app/theme";
import "@/shared/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </ThemeProvider>
  </React.StrictMode>
);
