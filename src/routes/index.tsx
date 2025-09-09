import App from "@/App";
import { role } from "@/constants/role";
import DashboardLayout from "@/layout/DashboardLayout";
import Login from "@/Pages/Auth/Login";
import Signup from "@/Pages/Auth/Signup";
import type { TRole } from "@/types/auth.type";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import Unauthorized from "@/Pages/MYComponent/Unauthorized";
import ErrorPage from "@/Pages/MYComponent/ErrorPage";
import Home from "@/Pages/Website/Home/Home/Home";
import About from "@/Pages/Website/About/About";
import Faq from "@/Pages/Website/Faq/Faq";
import Contact from "@/Pages/Website/Contact/Contact";
import Project from "@/Pages/Website/Project/Project";
import SingleProject from "@/Pages/Website/SingleProject/SingleProject";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Project,
        path: "/projects",
      },
      {
        Component: SingleProject,
        path: "/projects/:id",
      },
      {
        Component: Faq,
        path: "/faq",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: Login,
        path: "login",
      },
      {
        Component: Signup,
        path: "signup",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin/dashboard",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard/my-profile" />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent/dashboard",
    children: [
      {
        index: true,
        element: <Navigate to="/agent/dashboard/quick-actions" />,
      },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user/dashboard",
    children: [
      { index: true, element: <Navigate to="/user/dashboard/my-profile" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
