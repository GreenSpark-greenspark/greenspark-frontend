"use client";
import { useState } from "react";

import Box from "@/components/Box";
import styles from "./QuizAnswer.module.css";
import IconMent from "@/../public/icon/quiz_ment.svg";
import IconCorrect from "@/../public/icon/quiz_correct.svg";
import IconWrong from "@/../public/icon/quiz_wrong.svg";

interface QuizData {
  // questionId: number;
  isCorrect: boolean;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  explanation: string;
}
interface QuizAnswerProps {
  id: string;
}
export default function QuizAnswer({ id }: QuizAnswerProps) {
  const mockData: QuizData = {
    // questionId: 1,
    isCorrect: true,
    question: "가정에서 에너지를 절약하기 위한 올바른 방법은 무엇인가요?",
    correctAnswer: "전등을 LED로 교체하기",
    selectedAnswer: "에어컨을 밤새 켜두기",
    explanation:
      "LED 전등은 백열등보다 훨씬 적은 전력을 소비하고 수명이 길어요! 환경에도 좋고 비용도 절약할 수 있는 방법이에요!"
  };

  const [quizData] = useState<QuizData>(mockData);

  return (
    <div className={styles.boxContainer}>
      <Box minHeight="330px">
        <div className={styles.quizBoxContainer}>
          <div className={styles.iconMentContainer}>
            <IconMent style={{ width: "3.2rem", height: "2.4rem" }} />
            <p>Q{id}</p>
          </div>

          {quizData.isCorrect ? (
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

          <p className={styles.quizTitle}>{quizData.question}</p>

          <div className={styles.answerContainer}>
            <p className={styles.quizAnswer}>
              <span className={styles.textGreen}>정답</span>: {quizData.correctAnswer}
            </p>
            {!quizData.isCorrect && (
              <p className={styles.quizAnswer}>
                <span className={styles.textRed}>오답</span>: {quizData.selectedAnswer}
              </p>
            )}
          </div>

          <div className={styles.expBox}>
            <p className={styles.expTitle}>해설</p>
            <p className={styles.expBody}>{quizData.explanation}</p>
          </div>
        </div>
      </Box>
    </div>
  );
}
