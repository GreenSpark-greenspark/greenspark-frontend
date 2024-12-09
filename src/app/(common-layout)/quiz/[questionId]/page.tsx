"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import QuizSubmit from "@/app/_component/quiz/QuizSubmit";

const Page = () => {
  const { questionId } = useParams();
  const searchParams = useSearchParams();
  const quizIdParam = searchParams.get("quizId");

  const questionIdNumber = Array.isArray(questionId)
    ? parseInt(questionId[0])
    : parseInt(questionId);

  const quizId = quizIdParam ? parseInt(quizIdParam) : null;

  const [tokenRenewed, setTokenRenewed] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const renewToken = async () => {
      try {
        const response = await axios.post(`${API_URL}/reissue`, {}, { withCredentials: true });
        if (response.data.success) {
          console.log("토큰 갱신 성공");
          setTokenRenewed(true);
        } else {
          console.error("토큰 갱신 실패:", response.data.message);
        }
      } catch (error) {
        console.error("토큰 갱신 중 오류 발생:", error);
      }
    };

    renewToken();
  }, [API_URL]);
  return (
    <div style={{ height: "100vh" }}>
      {tokenRenewed ? (
        <>
          {quizId && questionIdNumber ? (
            <QuizSubmit questionId={questionIdNumber} quizId={quizId} />
          ) : (
            <p>Loading...</p>
          )}
        </>
      ) : (
        <p>토큰 갱신 중...</p>
      )}
    </div>
  );
};

export default Page;
