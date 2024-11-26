"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Box from "@/components/Box";
import Popup from "./Popup";
import styles from "./QuizMain.module.css";
import IconPower from "@/../public/icon/quiz_power.svg";
import IconArrow from "@/../public/icon/arrow_left.svg";

export default function QuizMain() {
  const router = useRouter();

  const [quizStatus, setQuizStatus] = useState({
    quiz1: false,
    quiz2: true
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);

  const openPopup = (questionId: number) => {
    setCurrentQuestionId(questionId);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const handleQuizClick = (questionId: number) => {
    router.push(`/quiz/${questionId}`);
  };

  let quizMent;
  if (!quizStatus.quiz1 && !quizStatus.quiz2) {
    quizMent = "매일 2개씩 오픈되는 오늘의 에너지 퀴즈를 풀어보세요.";
  } else if (quizStatus.quiz1 && quizStatus.quiz2) {
    quizMent = "오늘의 모든 퀴즈를 완료했습니다! 내일 다시 도전해보세요.";
  } else {
    quizMent = "남은 퀴즈를 풀고 더 많은 포인트를 획득하세요!";
  }

  return (
    <div className={styles.boxContainer}>
      <Box minHeight="330px">
        <div className={styles.quizBoxContainer}>
          <p className={styles.quizTitle}>
            하루에 <span className={styles.bold6}>두 번</span> 찾아오는 기회!
          </p>
          <div className={styles.quizContainer}>
            {/* 첫 번째 */}
            <div
              className={quizStatus.quiz1 ? styles.quizBtnClose : styles.quizBtnOpen}
              onClick={() => !quizStatus.quiz1 && handleQuizClick(1)}
            >
              <div className={styles.quizBtnLeft}>
                <IconPower className={styles.iconPower} />
                <p className={styles.quizNormal}>첫 번째 퀴즈</p>
              </div>
              {quizStatus.quiz1 ? (
                <button className={styles.expBtn} onClick={() => openPopup(1)}>
                  해설보기
                </button>
              ) : (
                <IconArrow className={styles.iconArrow} />
              )}
            </div>

            {/* 두 번째 */}
            <div
              className={quizStatus.quiz2 ? styles.quizBtnClose : styles.quizBtnOpen}
              onClick={() => !quizStatus.quiz2 && handleQuizClick(2)}
            >
              <div className={styles.quizBtnLeft}>
                <IconPower className={styles.iconPower} />
                <p className={styles.quizNormal}>두 번째 퀴즈</p>
              </div>
              {quizStatus.quiz2 ? (
                <button className={styles.expBtn} onClick={() => openPopup(2)}>
                  해설보기
                </button>
              ) : (
                <IconArrow className={styles.iconArrow} />
              )}
            </div>
          </div>

          <p className={styles.quizMentNormal}>{quizMent}</p>
        </div>
      </Box>

      {isPopupOpen && <Popup questionId={currentQuestionId} onClose={closePopup} />}
    </div>
  );
}
