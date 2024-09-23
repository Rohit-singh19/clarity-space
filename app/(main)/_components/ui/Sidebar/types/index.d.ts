import { DocumentData } from "firebase/firestore";
import { LucideProps } from "lucide-react";
import React from "react";

export interface RoomDocument extends DocumentData {
  userId: string;
  role: "owner" | "editor" | "reader";
  createdAt: Date;
  updatedAt: Date;
  roomId: string;
  parent: string;
}

interface RoomTreeNode extends RoomDocument {
  children: RoomTreeNode[];
}

export interface SidebarItemProps {
  label?: string;
  Icon?: React.ComponentType<LucideProps> | null;
  iconProps?: object;
  disableContextMenu?: boolean;
  addPage?: boolean;
  href?: string;
  onClick?: () => void;
  isLoading?: boolean;
  docId?: string;
  children?: RoomDocument[];
}

export interface SidebarIconProps {
  isLoading?: boolean;
  Icon?: React.ComponentType<LucideProps> | null;
  iconProps?: object;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  icon?: string;
  hasChildren?: boolean;
}
