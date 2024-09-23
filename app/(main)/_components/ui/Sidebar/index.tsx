"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { createNewDoc } from "@/actions/doc/createNewDoc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { sidebarItems, SidebarItemType } from "@/lib/sidebarItems";

import { Plus, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useTransition, useEffect, useState, useCallback } from "react";
import AccountSwitcher from "./AccountSwitcher";
import SidebarItem from "./SidebarItem";
import { useClerk, useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { RoomDocument, RoomTreeNode } from "./types";
import { Loader } from "lucide-react";

const Sidebar = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [ownerTree, setOwnerTree] = useState<RoomTreeNode[]>([]);
  const [sharedTree, setSharedTree] = useState<RoomTreeNode[]>([]);

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDoc();
      router.push(`/doc/${docId}`);
    });
  };

  const createTree = useCallback(
    (
      rooms: RoomDocument[]
    ): { owner: RoomTreeNode[]; shared: RoomTreeNode[] } => {
      const roomMap = new Map<string, RoomTreeNode>();
      const result: { owner: RoomTreeNode[]; shared: RoomTreeNode[] } = {
        owner: [],
        shared: [],
      };
      rooms.forEach((room) => {
        const roomNode: RoomTreeNode = { ...room, children: [] };
        roomMap.set(room.roomId, roomNode);
      });

      roomMap.forEach((roomNode) => {
        const parentId = roomNode.parent;
        if (parentId) {
          const parent = roomMap.get(parentId);
          if (parent) {
            parent.children.push(roomNode);
          }
        } else {
          if (roomNode.role === "owner") {
            result.owner.push(roomNode);
          } else {
            result.shared.push(roomNode);
          }
        }
      });

      return result;
    },
    []
  );

  // function to group the date on the basis of owner with it's nested children & shared doc
  useEffect(() => {
    if (!data) return;

    setIsLoading(true);

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      shared: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({ id: curr.id, ...roomData });
        } else if (roomData.role === "editor") {
          acc.shared.push({ id: curr.id, ...roomData });
        }

        return acc;
      },
      { owner: [], shared: [] }
    );

    const { owner, shared } = createTree([...grouped.owner, ...grouped.shared]);

    console.log("owner:::", owner);
    setOwnerTree(owner);
    setSharedTree(shared);
    setIsLoading(false);
  }, [data, createTree]);

  return (
    <div className="flex flex-col h-full p-2">
      <AccountSwitcher />

      {sidebarItems?.map((item: SidebarItemType) => (
        <SidebarItem
          Icon={item.Icon}
          label={item.label}
          disableContextMenu={true}
          addPage={false}
          href={item.href}
          key={item.label}
        />
      ))}

      <SidebarItem
        Icon={Plus}
        label={"Create new space"}
        disableContextMenu={true}
        addPage={false}
        isLoading={isPending}
        onClick={() => {
          handleCreateNewDocument();
        }}
      />

      <Separator className="my-2" />
      <ScrollArea className="flex-1 ">
        {(loading || isLoading) && (
          <div className="w-full h-full flex justify-center items-center">
            <Loader className="w-4 h-4 animate-spin" />
          </div>
        )}

        {!isLoading &&
          !loading &&
          ownerTree?.length === 0 &&
          sharedTree?.length === 0 && (
            <p className="text-xs text-center ">No space created</p>
          )}

        {!isLoading && ownerTree?.length > 0 && (
          <React.Fragment>
            <h1 className="text-xs px-3 font-medium text-gray-500 mt-2">
              My Spaces
            </h1>

            {ownerTree?.map((room) => (
              <SidebarItem
                key={room.id}
                label={room.name}
                docId={room.id}
                href={`/doc/${room.roomId}`}
                children={room.children}
              />
            ))}
          </React.Fragment>
        )}

        {!isLoading && sharedTree?.length > 0 && (
          <React.Fragment>
            <h1 className="text-xs px-3 font-medium text-gray-500 mt-2">
              Shared Spaces
            </h1>
            {sharedTree?.map((room) => (
              <SidebarItem
                key={room.id}
                label={room.name}
                docId={room.id}
                href={`/doc/${room.roomId}`}
                children={room.children}
              />
            ))}
          </React.Fragment>
        )}
      </ScrollArea>

      <div>
        <Separator className="my-2" />
        <SidebarItem
          Icon={Settings}
          label={"Settings"}
          disableContextMenu={true}
          addPage={false}
          onClick={() => {
            openUserProfile();
          }}
        />

        <SidebarItem
          Icon={Trash2}
          label={"Trash"}
          disableContextMenu={true}
          addPage={false}
          href={"/dashboard/trash"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
