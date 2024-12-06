"use client";
import { useEffect } from "react";
import { useQuizContext } from "@/context/QuizContext";
import Box from "@/components/Box";
import styles from "./QuizAnswer.module.css";
import IconMent from "@/../public/icon/quiz_ment.svg";
import IconCorrect from "@/../public/icon/quiz_correct.svg";
import IconWrong from "@/../public/icon/quiz_wrong.svg";
import IconArrow from "@/../public/icon/arrow_left.svg";

interface QuizAnswerProps {
  id: string;
}

export default function QuizAnswer({ id }: QuizAnswerProps) {
  const { question, userAnswer, correctAnswer, explanation, isCorrect } = useQuizContext();

  useEffect(() => {
    console.log("QuizAnswer Context Data:", {
      question,
      userAnswer,
      correctAnswer,
      explanation,
      isCorrect
    });
  }, [question, userAnswer, correctAnswer, explanation, isCorrect]);

  if (!question || !userAnswer || !correctAnswer || !explanation || !isCorrect) {
    return <p>로딩 중...</p>;
  }

  const goToQuizHome = () => {
    window.history.back();
  };

  return (
    <div className={styles.boxContainer}>
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
            <IconArrow className={styles.iconArrow} />
          </div>
        </div>
      </Box>
    </div>
  );
}
