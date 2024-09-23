import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, Loader } from "lucide-react";
import React, { memo, useCallback } from "react";
import { SidebarIconProps } from "./types";

const SidebarIcon: React.FC<SidebarIconProps> = ({
  isLoading,
  Icon,
  iconProps,
  setOpenSidebar,
  openSidebar,
  hasChildren,
}) => {
  const handleIconClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setOpenSidebar((prev) => !prev);
    },
    [setOpenSidebar]
  );

  return (
    <Button
      variant={"ghost"}
      size="icon"
      className="mr-2 hover:bg-slate-200 p-1 w-auto h-auto "
      onClick={handleIconClick}
      asChild
    >
      <div className="group/item">
        {isLoading && (
          <div className="w-4 h-4">
            <Loader className="animate-spin w-4 h-4" />
          </div>
        )}

        {Icon && !isLoading && (
          <>
            <Icon
              className={cn(
                "w-4 h-4 text-muted-foreground group-hover/item:hidden",
                !hasChildren && "group-hover/item:block"
              )}
              {...iconProps}
            />

            <ChevronRightIcon
              className={cn(
                "w-4 h-4 text-muted-foreground hidden group-hover/item:block transition-transform",
                openSidebar && "rotate-90 transition",
                !hasChildren && "group-hover/item:hidden"
              )}
            />
          </>
        )}
      </div>
    </Button>
  );
};

export default memo(SidebarIcon);
