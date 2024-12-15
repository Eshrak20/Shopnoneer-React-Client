import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import '../src/config/fontawesome/fontawesome';
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.onkeydown = function (e) {
  if (
    e.key === "F12" || 
    (e.ctrlKey && e.shiftKey && e.key === "I") || 
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    // alert("Inspecting is disabled!");
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <div className="">
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
  
);
