"use client";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./styles/theme";
import { useAtom } from "jotai";
import { themeAtom } from "@/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme] = useAtom(themeAtom);
  return (
    <ThemeProvider theme={theme === "Dark" ? darkTheme : lightTheme}>
      <html lang="en">
        <body style={{ padding: "0", margin: "0" }}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
