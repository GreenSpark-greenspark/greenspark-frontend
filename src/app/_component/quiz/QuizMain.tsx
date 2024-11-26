"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import Box from "@/components/Box";
import Popup from "./Popup";
import styles from "./QuizMain.module.css";
import IconPower from "@/../public/icon/quiz_power.svg";
import IconArrow from "@/../public/icon/arrow_left.svg";

export default function QuizMain() {
  const router = useRouter();
  const { quizStatus } = useQuiz();
  // const [quizStatus, setQuizStatus] = useState({
  //   quiz1: false,
  //   quiz2: false
  // });

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

  const getQuizMent = () => {
    if (!quizStatus.quiz1 && !quizStatus.quiz2) {
      return (
        <>
          <p className={styles.quizMentNormal}>
            <span className={styles.bold7}>매일 2개</span>씩 오픈되는 <br />
            오늘의 에너지 퀴즈를 풀어보세요.
          </p>
          <br />
          <p className={styles.quizMentNormal}>
            정답 하나 당 <span className={styles.boldGreen}>100포인트</span>를 획득할 수 있어요!
          </p>
        </>
      );
    } else if (quizStatus.quiz1 && quizStatus.quiz2) {
      return (
        <p className={styles.quizMentNormal}>
          오늘의 퀴즈는 종료되었지만
          <br />
          <span className={styles.bold7}>오늘의 퀴즈 해설</span>을 볼 수 있어요
          <br />
          ‘해설 보기’를 눌러보세요!
        </p>
      );
    } else {
      return (
        <p className={styles.quizMentNormal}>
          오늘 <span className={styles.bold7}>1개</span>의 퀴즈가 남았어요!
          <br />
          오늘의 퀴즈를 완료해봐요 :)
        </p>
      );
    }
  };

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

          <div className={styles.quizMent}>{getQuizMent()}</div>
        </div>
      </Box>

      {isPopupOpen && <Popup questionId={currentQuestionId} onClose={closePopup} />}
    </div>
  );
}
