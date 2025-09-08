import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import "../src/config/fontawesome/fontawesome";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
// document.addEventListener('contextmenu', (e) => e.preventDefault());
// document.onkeydown = function (e) {
//   if (
//     e.key === "F12" ||
//     (e.ctrlKey && e.shiftKey && e.key === "I") ||
//     (e.ctrlKey && e.key === "U")
//   ) {
//     e.preventDefault();
//   }import { auth, provider, signInWithPopup, signOut } from "../firebase"; // adjust path
// };

  
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ErrorBoundary>
      <AuthProvider>
        <HelmetProvider>
          <div className="">
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </AuthProvider>
  </ErrorBoundary>
  // </React.StrictMode>
);
