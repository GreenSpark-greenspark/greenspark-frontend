"use client";
import Box from "@/components/Box";
import styles from "./QuizMain.module.css";
import IconPower from "@/../public/icon/quiz_power.svg";
import IconArrow from "@/../public/icon/arrow_left.svg";

export default function QuizMain() {
  return (
    <div className={styles.boxContainer}>
      <Box minHeight="330px">
        <div className={styles.quizBoxContainer}>
          <p className={styles.quizTitle}>
            하루에 <span className={styles.bold6}>두 번</span> 찾아오는 기회!
          </p>
          <div className={styles.quizContainer}>
            {/* 첫 번째 */}
            <div className={styles.quizBtnOpen}>
              <div className={styles.quizBtnLeft}>
                <IconPower className={styles.iconPower} />
                <p className={styles.quizNormal}>첫 번째 퀴즈</p>
              </div>
              <IconArrow className={styles.iconArrow} />
            </div>
            {/* 두 번째 */}
            <div className={styles.quizBtnClose}>
              <div className={styles.quizBtnLeft}>
                <IconPower className={styles.iconPower} />
                <p className={styles.quizNormal}>두 번째 퀴즈</p>
              </div>
              <button className={styles.expBtn}>해설보기</button>
            </div>
          </div>
          <p className={styles.quizMentNormal}>
            매일 2개씩 오픈되는
            <br />
            오늘의 에너지 퀴즈를 풀어보세요.
          </p>
          <p className={styles.quizMentNormal}>정답 하나 당 100포인트를 획득할 수 있어요!</p>
        </div>
      </Box>
    </div>
  );
}
