import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AllRouter from "./allRouter.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllRouter />
    <ToastContainer />
  </StrictMode>
);
