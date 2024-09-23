"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { Loader } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex justify-between items-center py-2 px-4 bg-white transition-all duration-300 ease-in-out",
        {
          "fixed top-0 left-0 w-full border-b border-gray-200 z-50 ":
            isScrolled,
          "shadow-none": !isScrolled,
        }
      )}
    >
      <div>left</div>
      <div className="flex items-center gap-4">
        <Button size={"sm"} variant={"ghost"}>
          Request a demo
        </Button>
        <Separator orientation="vertical" className="h-6" />

        {!isLoaded && (
          <div className="w-[80px] flex justify-center items-center">
            <Loader className="animate-spin w-4 h-4" />
          </div>
        )}

        {!user && (
          <>
            <SignInButton mode="modal">
              <Button size={"sm"} variant={"ghost"}>
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size={"sm"}>Get Clarity Space free</Button>
            </SignUpButton>
          </>
        )}

        {user && (
          <>
            <Button size={"sm"} asChild>
              <Link href={"/"}>Dashboard</Link>
            </Button>

            <SignedIn>
              <UserButton afterSignOutUrl="/home" />
            </SignedIn>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
