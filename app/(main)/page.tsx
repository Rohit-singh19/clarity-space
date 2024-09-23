"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getGreeting } from "@/lib/getGreeting";
import { useUser } from "@clerk/nextjs";
import { History } from "lucide-react";
import React from "react";
import RecentlyVisited from "./_components/ui/dashboard/RecentlyVisited";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  return (
    <ScrollArea>
      <div className="max-w-4xl mx-auto">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-center text-neutral-700">
          {getGreeting()},{" "}
          {isLoaded ? (
            user?.fullName
          ) : (
            <Skeleton className="h-[25px] w-[120px] inline-block" />
          )}
        </h2>

        <div className="mt-10">
          <p className="text-xs text-muted-foreground flex justify-start items-center gap-1 mb-3">
            <History className="w-4 h-4" />
            Recently visited
          </p>

          <RecentlyVisited />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
