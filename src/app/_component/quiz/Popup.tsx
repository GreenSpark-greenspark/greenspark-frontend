import React from "react";
import styles from "./Popup.module.css";
import IconClose from "@/../public/icon/popup_close.svg";
import IconMent from "@/../public/icon/quiz_ment.svg";

export interface QuizData {
  quizId: number;
  question: string;
  explanation: string;
  answer: string;
}

interface PopupProps {
  quizData: QuizData;
  questionId: number;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ quizData, questionId, onClose }) => {
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
                <span className={styles.textGreen}>정답 </span>: {quizData.answer}
              </p>
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
