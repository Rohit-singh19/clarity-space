"use client";

import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  ChevronsLeft,
  LaptopMinimal,
  LogOut,
  Smartphone,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import React, { memo } from "react";

const AccountSwitcher = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Skeleton className="w-full h-[30px] rounded-sm" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-ellipsis overflow-hidden gap-1 w-full group flex justify-between items-center"
        >
          <div className="flex items-center gap-2 min-w-2">
            <div className="w-5 h-full overflow-hidden">
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.fullName
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
              {user?.fullName}'s Space
            </span>
          </div>

          <div className="flex items-center gap-1 w-auto h-auto">
            <Button
              size="icon"
              variant="ghost"
              className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto "
              title="close sidebar"
              asChild
            >
              <div className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto ">
                <ChevronsLeft className="h-4 w-4 text-gray-400 hover:text-foreground" />
              </div>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="p-1 hover:bg-slate-200 w-auto h-auto "
              title="Create new Doc"
              asChild
            >
              <div className="group-hover:visible invisible p-1 hover:bg-slate-200 w-auto h-auto ">
                <SquarePen className="h-4 w-4 font-bold" />
              </div>
            </Button>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="px-3">
        {/* <DropdownMenuLabel className="text-sm text-muted-foreground">
          {user?.emailAddresses[0]?.emailAddress}
        </DropdownMenuLabel> */}

        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent">
            <div className="flex ">
              <Avatar className="mr-2 mt-1 h-6 w-6 rounded-full">
                <AvatarImage
                  className="mr-2 h-6 w-6 rounded-full"
                  src={user?.imageUrl}
                />
                <AvatarFallback className="mr-2 h-6 w-6 rounded-full">
                  {user?.fullName
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start ml-2 gap-2">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <p className="text-sm font-semibold">
                      {user?.fullName}'s Space <br />
                    </p>
                    <Image
                      width={20}
                      height={20}
                      src="/assets/ai-star.gif"
                      alt="ai star"
                    />
                  </div>

                  <p className="text-xs text-grey-100">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
                <Button
                  variant={"default"}
                  size="sm"
                  className="text-xs h-6 bg-slate-200 text-primary hover:bg-primary hover:text-white"
                >
                  Log out
                </Button>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-transparent">
            <Button variant={"outline"} size="sm" className="mr-2 flex-1">
              <LaptopMinimal className="w-4 h-4" />
            </Button>
            <Button variant={"outline"} size="sm" className="mr-2 flex-1">
              <Smartphone className="w-4 h-4" />
            </Button>
          </DropdownMenuItem>

        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(AccountSwitcher);
