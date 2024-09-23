"use client";

import { Button } from "@/components/ui/button";
import { Share2, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import Search from "../Search";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <header className="px-4 py-2 h-8"></header>;
  }

  return (
    <header className="px-4 py-1 z-10 border-b">
      <div className="flex justify-between items-center">
        <div>
          <Search />
        </div>
        <div className="flex items-center gap-1">
          <Button variant={"ghost"} size="icon" title="Share">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant={"ghost"} size="icon" title="Add to favorites">
            <Star className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
