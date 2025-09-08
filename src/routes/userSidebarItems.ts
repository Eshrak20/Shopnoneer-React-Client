import MyProfile from "@/Pages/Dashboard/Users/ProfileSection/MyProfile";
import type { ISidebarItem } from "@/types/sidebar.type";

// const Overview = lazy(() => import("@/Pages/Dashboard/Overview/Overview"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      // {
      //   title: "Quick Actions",
      //   url: "/user/dashboard/quick-actions",
      //   component: Overview,
      //   icon: "FiBell",
      // },
      {
        title: "My Profile",
        url: "/user/dashboard/my-profile",
        component: MyProfile,
        icon: "FiUser",
      },
    ],
  },

];

