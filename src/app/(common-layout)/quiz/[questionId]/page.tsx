"use client";
import { useParams, useSearchParams } from "next/navigation";
import QuizSubmit from "@/app/_component/quiz/QuizSubmit";

export default function Page() {
  const { questionId } = useParams();
  const searchParams = useSearchParams();
  const quizIdParam = searchParams.get("quizId");

  const questionIdNumber = Array.isArray(questionId)
    ? parseInt(questionId[0])
    : parseInt(questionId);

  const quizId = quizIdParam ? parseInt(quizIdParam) : null;

  return (
    <>
      {quizId && questionIdNumber ? (
        <QuizSubmit questionId={questionIdNumber} quizId={quizId} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
