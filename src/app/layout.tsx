import "./globals.css";

import type { Metadata } from "next";
import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "app-name",
  description: "app-name description",
  openGraph: {
    type: "website",
    url: process.env.DOMAIN_URL,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(inter.variable, "antialiased min-h-screen")}>{children}</body>
    </html>
  );
}
