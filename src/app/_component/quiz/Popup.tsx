import React from "react";
import { useState } from "react";
import styles from "./Popup.module.css";
import IconClose from "@/../public/icon/popup_close.svg";
import IconMent from "@/../public/icon/quiz_ment.svg";

interface PopupProps {
  onClose: () => void;
  questionId: number | null;
}
interface QuizData {
  // questionId: number;
  isCorrect: boolean;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  explanation: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, questionId }: PopupProps) => {
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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
          <IconClose className={styles.iconClose} onClick={onClose} />
          <div className={styles.popupBody}>
            <div className={styles.iconMentContainer}>
              <IconMent style={{ width: "3.2rem", height: "2.4rem" }} />
              <p>Q{questionId}</p>
            </div>
            <p className={styles.quizTitle}>{quizData.question}</p>

            <div className={styles.answerContainer}>
              <p className={styles.quizAnswer}>
                <span className={styles.textGreen}>정답 </span>: {quizData.correctAnswer}
              </p>
              {!quizData.isCorrect && (
                <p className={styles.quizAnswer}>
                  <span className={styles.textRed}>오답 </span>: {quizData.selectedAnswer}
                </p>
              )}
            </div>

            <div className={styles.expBox}>
              <p className={styles.expTitle}>해설</p>
              <p className={styles.expBody}>{quizData.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
