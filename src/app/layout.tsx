import "@/styles/globals.css";
import "@/styles/reset.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import localFont from "next/font/local";
import ScrollReset from "@/components/ScrollReset";
import { Analytics } from "@vercel/analytics/react";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "GreenSpark",
  description: "그린스파크"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={pretendard.variable}>
      <body className={pretendard.variable}>
        <StyledComponentsRegistry>
          <ScrollReset />
          {children}
          <Analytics />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
