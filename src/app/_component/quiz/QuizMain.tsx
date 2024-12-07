"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Box from "@/components/Box";
import Popup from "./Popup";
import styles from "./QuizMain.module.css";
import IconPower from "@/../public/icon/quiz_power.svg";
import IconArrow from "@/../public/icon/arrow_left.svg";

interface QuizData {
  questionId: number;
  quizId: number;
  solved: boolean;
  question: string;
  explanation: string;
  answer: string;
}

export default function QuizMain() {
  const router = useRouter();

  const [quizStatus, setQuizStatus] = useState<QuizData[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/quiz`, {
          withCredentials: true
        });

        if (response.data.success) {
          const quizData = response.data.data.map((item: any, index: number) => ({
            questionId: index + 1,
            quizId: item.quiz.quizId,
            solved: item.solved,
            question: item.quiz.question,
            explanation: item.quiz.explanation,
            answer: item.quiz.answer
          }));

          setQuizStatus(quizData);
          console.log(quizData);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);

  const openPopup = (questionId: number) => {
    setCurrentQuestionId(questionId);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const handleQuizClick = (questionId: number) => {
    const quiz = quizStatus.find(q => q.questionId === questionId);

    if (quiz) {
      router.push(`/quiz/${questionId.toString()}?quizId=${quiz.quizId}`);
    } else {
      console.error("Quiz not found!");
    }
  };

  const isQuizSolved = (questionId: number) => {
    const quiz = quizStatus.find(q => q.questionId === questionId);
    return quiz ? quiz.solved : false;
  };

  const getQuizMent = () => {
    const allSolved = quizStatus.every(quiz => quiz.solved);
    const anyRemaining = quizStatus.some(quiz => !quiz.solved);

    if (anyRemaining) {
      return (
        <p className={styles.quizMentNormal}>
          오늘 <span className={styles.bold7}>{quizStatus.filter(q => !q.solved).length}</span>개의
          퀴즈가 남았어요!
          <br />
          오늘의 퀴즈를 완료해봐요 :)
        </p>
      );
    } else if (allSolved) {
      return (
        <p className={styles.quizMentNormal}>
          오늘의 퀴즈는 종료되었지만
          <br />
          <span className={styles.bold7}>오늘의 퀴즈 해설</span>을 볼 수 있어요.
          <br />
          ‘해설 보기’를 눌러보세요!
        </p>
      );
    } else {
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
              className={isQuizSolved(1) ? styles.quizBtnClose : styles.quizBtnOpen}
              onClick={() => !isQuizSolved(1) && handleQuizClick(1)}
            >
              <div className={styles.quizBtnLeft}>
                <IconPower className={styles.iconPower} />
                <p className={styles.quizNormal}>첫 번째 퀴즈</p>
              </div>
              {isQuizSolved(1) ? (
                <button className={styles.expBtn} onClick={() => openPopup(1)}>
                  해설보기
                </button>
              ) : (
                <IconArrow className={styles.iconArrow} />
              )}
            </div>

            {/* 두 번째 */}
            <div
              className={isQuizSolved(2) ? styles.quizBtnClose : styles.quizBtnOpen}
              onClick={() => !isQuizSolved(2) && handleQuizClick(2)}
            >
              <div className={styles.quizBtnLeft}>
                <IconPower className={styles.iconPower} />
                <p className={styles.quizNormal}>두 번째 퀴즈</p>
              </div>
              {isQuizSolved(2) ? (
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

      {isPopupOpen && currentQuestionId !== null && (
        <Popup
          quizData={quizStatus.find(quiz => quiz.questionId === currentQuestionId) as QuizData}
          questionId={currentQuestionId}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
