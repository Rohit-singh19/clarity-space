import React from "react";
import Header from "./_components/ui/Header";

const LandingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header />
      {children}
      landing Footer
    </div>
  );
};

export default LandingLayout;
