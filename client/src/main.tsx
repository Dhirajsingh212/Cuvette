import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    <Toaster position="top-right" />
  </StrictMode>
);
