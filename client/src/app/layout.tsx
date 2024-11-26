"use client";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./styles/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "Dark";
  });
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <html lang="en">
        <body style={{ padding: "0", margin: "0" }}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
