"use client";
import Box from "@/components/Box";
import styles from "./QuizSubmit.module.css";
import IconMent from "@/../public/icon/quiz_ment.svg";
import IconChoice from "@/../public/icon/quiz_check.svg";
import IconChoiceClick from "@/../public/icon/quiz_check_active.svg";
export default function QuizSubmit() {
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
            <div className={styles.answerBtn}>
              <IconChoice style={{ width: "1.9rem", height: "1.9rem", margin: "0.8rem" }} />
              <p className={styles.answerText}>에어컨을 밤새 켜두기</p>
            </div>
            <div className={styles.answerBtnClick}>
              <IconChoiceClick style={{ width: "1.9rem", height: "1.9rem", margin: "0.8rem" }} />
              <p className={styles.answerText}>전등을 LED로 교체하기</p>
            </div>
            <div className={styles.answerBtn}>
              <IconChoice style={{ width: "1.9rem", height: "1.9rem", margin: "0.8rem" }} />
              <p className={styles.answerText}>냉장고 문을 자주 열기</p>
            </div>
            <div className={styles.answerBtn}>
              <IconChoice style={{ width: "1.9rem", height: "1.9rem", margin: "0.8rem" }} />
              <p className={styles.answerText}>사용하지 않는 전자기기를 플러그에 꽂아두기</p>
            </div>
          </div>
          <button className={styles.submitBtn}>제출하기</button>
        </div>
      </Box>
    </div>
  );
}
