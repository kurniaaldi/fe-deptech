"use client";

import theme from "@/components/theme";
import { store } from "@/store";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
