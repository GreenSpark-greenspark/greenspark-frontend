"use client";

import TopBar from "@/components/TopBar";
import { QuizProvider } from "@/context/QuizContext";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QuizProvider>
        <TopBar text={"에너지 퀴즈"} />
        {children}
      </QuizProvider>
    </>
  );
}
