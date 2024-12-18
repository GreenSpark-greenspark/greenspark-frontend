"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuizContext } from "@/context/QuizContext";
import axios from "axios";
import Box from "@/components/Box";
import styles from "./QuizAnswer.module.css";
import IconMent from "@/../public/icon/quiz_ment.svg";
import IconCorrect from "@/../public/icon/quiz_correct.svg";
import IconWrong from "@/../public/icon/quiz_wrong.svg";
import Lottie from "react-lottie";
import { confetti } from "@/lib/lottiConfetti";

interface QuizAnswerProps {
  id: string;
}

export default function QuizAnswer({ id }: QuizAnswerProps) {
  const { question, userAnswer, correctAnswer, explanation, isCorrect } = useQuizContext();
  const [showConfetti, setShowConfetti] = useState(false);

  const isConfettiPlayed = useRef(false);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (isCorrect === "true" && !isConfettiPlayed.current) {
      // 포인트 업데이트
      const updatePoint = async () => {
        try {
          const response = await axios.post(
            `${API_URL}/point/update`,
            {
              pointAmount: 100,
              event: "오늘의 퀴즈 완료"
            },
            {
              withCredentials: true
            }
          );
          console.log("포인트 업데이트 성공:", response.data);
        } catch (error) {
          console.error("포인트 업데이트 실패:", error);
        }
      };

      updatePoint();

      // 컨페티
      setShowConfetti(true);
      isConfettiPlayed.current = true;

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  const router = useRouter();
  const goToQuizHome = () => {
    router.push(`/quiz`);
  };

  if (!question || !userAnswer || !correctAnswer || !explanation || !isCorrect) {
    return (
      <div
        style={{
          width: "375px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Lottie options={confetti} height={400} width={400} />
      </div>
    );
  }

  return (
    <div className={styles.boxContainer} style={{ position: "relative" }}>
      {showConfetti && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000
          }}
        >
          <Lottie options={confetti} height="400" width="400" />
        </div>
      )}
      <Box minHeight="330px">
        <div className={styles.quizBoxContainer}>
          <div className={styles.iconMentContainer}>
            <IconMent style={{ width: "3.2rem", height: "2.4rem" }} />
            <p>Q{id}</p>
          </div>

          {isCorrect === "true" ? (
            <>
              <p className={styles.correctTitle}>
                <span className={styles.textGreen}>정답</span>이에요!
              </p>
              <p className={styles.quizPoint}>
                <span className={styles.quizTitle}>100포인트</span>를 획득했어요!
              </p>
              <IconCorrect className={styles.iconCorrect} />
            </>
          ) : (
            <>
              <p className={styles.correctTitle}>
                <span className={styles.textRed}>오답</span>이에요!
              </p>
              <p className={styles.quizPoint}>다음 기회에 다시 도전해봐요..</p>
              <IconWrong className={styles.iconCorrect} />
            </>
          )}

          <p className={styles.quizTitle}>{question}</p>

          <div className={styles.answerContainer}>
            <p className={styles.quizAnswer}>
              <span className={styles.textGreen}>정답 </span>: {correctAnswer}
            </p>
            {isCorrect === "false" && (
              <p className={styles.quizAnswer}>
                <span className={styles.textRed}>오답 </span>: {userAnswer}
              </p>
            )}
          </div>

          <div className={styles.expBox}>
            <p className={styles.expTitle}>해설</p>
            <p className={styles.expBody}>{explanation}</p>
          </div>
          <div className={styles.homeBtn} onClick={goToQuizHome}>
            <p>퀴즈 홈으로 가기</p>
          </div>
        </div>
      </Box>
    </div>
  );
}
