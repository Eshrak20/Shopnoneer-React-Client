
import CreateProject from "@/Pages/Dashboard/Project/CreateProject";
import MyProfile from "@/Pages/Dashboard/Users/ProfileSection/MyProfile";
import type { ISidebarItem } from "@/types/sidebar.type";


// const Overview = lazy(() => import("@/Pages/Dashboard/Overview/Overview"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      // {
      //   title: "Quick Actions",
      //   url: "/admin/dashboard/quick-actions",
      //   component: Overview,
      //   icon: "FiBell",
      // },
      {
        title: "My Profile",
        url: "/admin/dashboard/my-profile",
        component: MyProfile,
        icon: "FiUser",
      },
    ],
  },

  {
    title: "Manage Project",
    items: [
      {
        title: "Create Project",
        url: "/admin/dashboard/all-users",
        component: CreateProject,
        icon: "FiUsers",
      },
    ],
  },




];
