import "@/styles/globals.css";
import "@/styles/reset.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNav from "@/components/bottomNav";

const inter = Inter({ subsets: ["latin"] });

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
    <>
      <html lang="ko">
        <body className={inter.className}>
          <div>레이아웃</div>
          {children}
          <BottomNav />
        </body>
      </html>
    </>
  );
}
