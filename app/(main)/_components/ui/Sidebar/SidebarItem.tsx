"use client";

import { createNewDoc } from "@/actions/doc/createNewDoc";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { db } from "@/firebase";
import { cn } from "@/lib/utils";
import { doc } from "firebase/firestore";
import { Ellipsis, FileText, Loader, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useTransition,
  memo,
} from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import SidebarIcon from "./SidebarIcon";
import { SidebarItemProps } from "./types";

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  Icon = FileText,
  iconProps,
  disableContextMenu = false,
  addPage = true,
  href = "",
  onClick = () => {},
  isLoading = false,
  docId = "",
  children = [],
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);
  const contextMenuRef = useRef<HTMLElement | null>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [data, loading, error] = useDocumentData(
    docId ? doc(db, "documents", docId) : null
  );

  // open the context menu on clicking the more button
  const handleEllipsisClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 2,
        buttons: 2,
        clientX: e.clientX,
        clientY: e.clientY,
      });
      if (contextMenuRef.current) {
        contextMenuRef.current.dispatchEvent(event);
      }
    },
    [contextMenuRef]
  );

  // handle creating a new document inside the current doc
  const handleAddPage = useCallback(() => {
    if (!docId) return;
    startTransition(async () => {
      const { docId: childDocId } = await createNewDoc(docId);
      setOpenSidebar(false);
      router.push(`/doc/${childDocId}`);
    });
  }, [docId]);

  if (docId && !data) return null;

  const Wrapper = href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={href}>{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <button
          onClick={onClick}
          className="w-full text-left"
          disabled={isLoading}
        >
          {children}
        </button>
      );

  return (
    <>
      <ContextMenu>
        <Wrapper>
          <Button
            className={cn(
              "flex w-full justify-start group",
              isActive && "bg-muted",
              (isLoading || loading) &&
                "opacity-50 cursor-not-allowed pointer-events-none"
            )}
            size={"sm"}
            variant={"ghost"}
            disabled={isLoading || loading}
            asChild
          >
            <ContextMenuTrigger
              ref={contextMenuRef}
              disabled={disableContextMenu || isLoading || loading}
              className="flex justify-between items-center gap-1"
            >
              <div className="flex justify-start items-center gap-1 max-w-full">
                <SidebarIcon
                  isLoading={isLoading || loading}
                  Icon={Icon}
                  setOpenSidebar={setOpenSidebar}
                  openSidebar={openSidebar}
                  hasChildren={children?.length > 0}
                />

                <span className="text-md text-ellipsis overflow-hidden whitespace-nowrap">
                  {docId ? data?.title : label}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
                {!disableContextMenu && (
                  <Button
                    variant={"ghost"}
                    className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto"
                    size="icon"
                    asChild
                    onClick={handleEllipsisClick}
                  >
                    <div className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto cursor-pointer">
                      <Ellipsis className="text-muted-foreground h-4 w-4" />
                    </div>
                  </Button>
                )}

                {addPage && (
                  <>
                    {isPending ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Button
                        variant={"ghost"}
                        size="icon"
                        className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto"
                        title="Add a page inside"
                        asChild
                        onClick={handleAddPage}
                      >
                        <div className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto">
                          <Plus className="text-muted-foreground h-4 w-4" />
                        </div>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </ContextMenuTrigger>
          </Button>
        </Wrapper>

        <ContextMenuContent className="w-60">
          <ContextMenuItem inset>Add to Favorites</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem inset>Copy link</ContextMenuItem>
          <ContextMenuItem inset>
            Duplicate
            <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Rename
            <ContextMenuShortcut>Ctrl+Shift+R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Move to
            <ContextMenuShortcut>Ctrl+Shift+P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>Move to Trash</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem inset>Open in new tab</ContextMenuItem>
          <ContextMenuSeparator />
          <p className="text-xs text-muted-foreground text-normal px-3 ">
            Last edited by You <br />
            Jun 3 2024, 4:33 PM
          </p>
        </ContextMenuContent>
      </ContextMenu>

      {openSidebar && children?.length > 0 && (
        <div className="pl-2">
          {children?.map((child) => (
            <SidebarItem
              key={child.id}
              label={child.name}
              docId={child.id}
              href={`/doc/${child.id}`}
              children={child.children}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default memo(SidebarItem);
