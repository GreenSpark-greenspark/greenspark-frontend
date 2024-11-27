"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuizSubmit from "@/app/_component/quiz/QuizSubmit";

export default function Page() {
  const { questionId } = useParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (questionId) {
      setId(Array.isArray(questionId) ? questionId[0] : questionId);
    }
  }, [questionId]);

  return <>{id ? <QuizSubmit id={id} /> : <p>Loading...</p>} </>;
}
