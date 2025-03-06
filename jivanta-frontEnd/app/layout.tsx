import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jivanta - Your Health, Our Priority",
  description: "Online pharmacy and healthcare products",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "absolute"}>
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}

import "./globals.css";import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

