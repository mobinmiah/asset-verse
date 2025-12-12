import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/router.jsx";
import AuthProveder from "./contexts/AuthProvider/AuthProveder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProveder>
      <RouterProvider router={router}></RouterProvider>
    </AuthProveder>
  </StrictMode>
);
