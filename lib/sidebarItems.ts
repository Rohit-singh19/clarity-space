import { House } from "lucide-react";

export type SidebarItemType = {
  label: string;
  href: string;
  Icon: any;
};

export const sidebarItems = [
  {
    label: "Home",
    href: "/",
    Icon: House,
  },
];
