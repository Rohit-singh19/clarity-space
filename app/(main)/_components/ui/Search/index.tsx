import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Calendar, SearchIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const Search = () => {
  const [open, setOpen] = useState(false);
  const isMac = false; // /Mac|iPod|iPhone|iPad/.test(navigator?.platform);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant={"ghost"}
        size="sm"
        className="flex justify-between items-center cursor-pointer min-w-[240px] max-w-[400px] py-1 hover:bg-transparent px-0"
        onClick={() => setOpen((open) => !open)}
      >
        <p className="text-xs text-gray-400 flex justify-start items-center gap-1">
          <SearchIcon className="w-4 h-4 text-gray-800" /> Search notes...
        </p>

        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 border  rounded px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"} + </span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
