"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuizAnswer from "@/app/_component/quiz/QuizAnswer";
import { QuizProvider } from "@/context/QuizContext";

export default function Page() {
  const { questionId } = useParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (questionId) {
      setId(Array.isArray(questionId) ? questionId[0] : questionId);
    }
  }, [questionId]);

  return (
    <>
      <QuizProvider>{id ? <QuizAnswer id={id} /> : <p>Loading...</p>}</QuizProvider>
    </>
  );
}
