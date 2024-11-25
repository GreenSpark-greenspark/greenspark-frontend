"use client";
import { useState } from "react";
import Box from "@/components/Box";
import styles from "./QuizSubmit.module.css";
import IconMent from "@/../public/icon/quiz_ment.svg";
import IconChoice from "@/../public/icon/quiz_check.svg";
import IconChoiceClick from "@/../public/icon/quiz_check_active.svg";

export default function QuizSubmit() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  return (
    <div className={styles.boxContainer}>
      <Box minHeight="330px">
        <div className={styles.iconMentContainer}>
          <IconMent style={{ width: "3.2rem", height: "2.4rem" }} />
          <p>Q1</p>
        </div>
        <div className={styles.quizBoxContainer}>
          <p className={styles.quizTitle}>
            가정에서 에너지를 절약하기 위한 올바른 방법은 무엇인가요?
          </p>
          <div className={styles.answerContainer}>
            {[
              "에어컨을 밤새 켜두기",
              "전등을 LED로 교체하기",
              "냉장고 문을 자주 열기",
              "사용하지 않는 전자기기를 플러그에 꽂아두기"
            ].map((answer, index) => (
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
          >
            제출하기
          </button>
        </div>
      </Box>
    </div>
  );
}
