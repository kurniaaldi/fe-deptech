"use client";

import StoreProvider from "@/provider/storeProvider";
import React from "react";

const HiFiLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <main className="h-full min-h-screen w-full background-radial">
        {children}
      </main>
    </StoreProvider>
  );
};

export default HiFiLayout;
