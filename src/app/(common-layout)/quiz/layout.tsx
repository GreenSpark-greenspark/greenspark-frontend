"use client";

import TopBarToHome from "@/components/TopBarToHome";
import { QuizProvider } from "@/context/QuizContext";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QuizProvider>
        <TopBarToHome text={"에너지 퀴즈"} />
        {children}
      </QuizProvider>
    </>
  );
}
