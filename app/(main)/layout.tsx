import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import React from "react";
import Navbar from "./_components/ui/Navbar";
import Sidebar from "./_components/ui/Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex flex-1 overflow-hidden"
        >
          {/* Sidebar Panel */}
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={30}
            className="bg-sidebarBg overflow-auto"
          >
            <Sidebar />
          </ResizablePanel>

          <ResizableHandle className="cursor-col-resize hover:bg-gray-400 " />

          {/* Content Panel */}
          <ResizablePanel
            defaultSize={80}
            className="flex flex-col overflow-auto"
          >
            <div className="flex flex-col h-full">
              <Navbar />

              <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default DashboardLayout;
