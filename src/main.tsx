import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

// GitHub Pages may serve /repo/index.html — normalize so the router matches "/".
const basePath = import.meta.env.VITE_BASE_PATH;
if (basePath && window.location.pathname.endsWith("/index.html")) {
  const normalized = basePath.endsWith("/") ? basePath : `${basePath}/`;
  window.history.replaceState(null, "", normalized);
}

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
