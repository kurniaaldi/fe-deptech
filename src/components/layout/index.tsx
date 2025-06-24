"use client";

import React from "react";
import ResponsiveAppBar from "../navbar";

const HiFiLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full min-h-screen w-full background-radial">
      <ResponsiveAppBar />
      {children}
    </main>
  );
};

export default HiFiLayout;
