"use client";

import StoreProvider from "@/provider/storeProvider";
import { ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../theme";
import ResponsiveAppBar from "../navbar";

const HiFiLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <main className="h-full min-h-screen w-full background-radial">
          <ResponsiveAppBar />
          {children}
        </main>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default HiFiLayout;
