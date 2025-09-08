import MyProfile from "@/Pages/Dashboard/Users/ProfileSection/MyProfile";
import type { ISidebarItem } from "@/types/sidebar.type";
// const Overview = lazy(
//   () => import("@/Pages/Dashboard/Overview/Overview")
// );

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      // {
      //   title: "Quick Actions",
      //   url: "/agent/dashboard/quick-actions",
      //   component: Overview,
      //   icon: "FiBell",
      // },
      {
        title: "My Profile",
        url: "/agent/dashboard/my-profile",
        component: MyProfile,
        icon: "FiUser",
      },
    ],
  },
];

