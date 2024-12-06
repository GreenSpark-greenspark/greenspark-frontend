"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Box from "@/components/Box";
import styles from "./QuizSubmit.module.css";
import IconMent from "@/../public/icon/quiz_ment.svg";
import IconChoice from "@/../public/icon/quiz_check.svg";
import IconChoiceClick from "@/../public/icon/quiz_check_active.svg";
import { useQuizContext } from "@/context/QuizContext";
import { apiWrapper } from "@/utils/api";

interface QuizSubmitProps {
  questionId: number;
  quizId: number;
}

export default function QuizSubmit({ questionId, quizId }: QuizSubmitProps) {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizData, setQuizData] = useState<any>(null);

  const { setQuizData: setQuizContext } = useQuizContext();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz/${quizId}`);
        if (response.data.success) {
          setQuizData(response.data.data);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleAnswerSubmit = async () => {
    return apiWrapper(async () => {
      if (selectedAnswer !== null) {
        console.log(quizId, quizData[`choice${selectedAnswer + 1}`]);
        try {
          const response = await axios.post(
            `${API_URL}/submit`,
            {},
            {
              withCredentials: true,
              params: { quizId, userAnswer: quizData[`choice${selectedAnswer + 1}`] }
            }
          );

          const { data } = response;
          if (data.success) {
            console.log("서버 응답 데이터:", data);

            setQuizContext({
              question: data.data.question,
              userAnswer: data.data.userAnswer,
              correctAnswer: data.data.correctAnswer,
              explanation: data.data.explanation,
              isCorrect: data.data.correct ? "true" : "false"
            });

            console.log("퀴즈 컨텍스트에 설정된 데이터:", {
              question: data.data.question,
              userAnswer: data.data.userAnswer,
              correctAnswer: data.data.correctAnswer,
              explanation: data.data.explanation,
              isCorrect: data.data.correct ? "true" : "false"
            });
            router.push(`/quiz/${questionId}/answer`);
          } else {
            console.error("제출 실패:", data.message);
          }
        } catch (error) {
          console.error("API 호출 중 오류 발생:", error);
        }
      }
    }, API_URL);
  };

  if (!quizData) {
    return <p>Loading...</p>;
  }

  const answers = [quizData.choice1, quizData.choice2, quizData.choice3, quizData.choice4];
  return (
    <div className={styles.boxContainer}>
      <Box minHeight="330px">
        <div className={styles.iconMentContainer}>
          <IconMent style={{ width: "3.2rem", height: "2.4rem" }} />
          <p>Q{questionId}</p>
        </div>
        <div className={styles.quizBoxContainer}>
          <p className={styles.quizTitle}>{quizData.question}</p>
          <div className={styles.answerContainer}>
            {answers.map((answer, index) => (
              <div
                key={index}
                className={selectedAnswer === index ? styles.answerBtnClick : styles.answerBtn}
                onClick={() => handleAnswerClick(index)}
              >
                {selectedAnswer === index ? (
                  <IconChoiceClick
                    style={{ width: "1.9rem", height: "1.9rem", margin: "0.8rem" }}
                  />
                ) : (
                  <IconChoice style={{ width: "1.9rem", height: "1.9rem", margin: "0.8rem" }} />
                )}
                <p className={styles.answerText}>{answer}</p>
              </div>
            ))}
          </div>
          <button
            className={selectedAnswer !== null ? styles.submitBtnClick : styles.submitBtn}
            disabled={selectedAnswer === null}
            onClick={handleAnswerSubmit}
          >
            제출하기
          </button>
        </div>
      </Box>
    </div>
  );
}
