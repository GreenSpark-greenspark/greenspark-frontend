import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";
import Toast from "@/components/Toast";
import IconClose from "@/../public/icon/popup_close.svg";

type PowerPopupProps = {
  year: number;
  month: number;
  type: "cost" | "usage";
  onClose: () => void;
};

const Popup: React.FC<PowerPopupProps> = ({ year, month, type, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const typeName = type === "cost" ? "전기요금" : "전력사용량";
  const unit = type === "cost" ? "원" : "Kwh";

  const buttonClass = inputValue
    ? `${styles.submitBtn} ${styles.submitBtnGreen}`
    : styles.submitBtn;

  // 숫자 유효성 검사
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value && !/^\d+$/.test(value)) {
      setToastMessage("숫자만 입력해주세요");
      return;
    }

    setInputValue(value);
  };

  const handleSubmit = () => {
    if (!inputValue) {
      setToastMessage("숫자만 입력해주세요");
      return;
    }

    onClose();
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
          <IconClose className={styles.iconClose} onClick={onClose} />

          <p className={styles.popupTitle}>{`${year}년 ${month}월의 ${typeName}은?`}</p>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputBox}
              value={inputValue}
              onChange={handleInputChange}
            />
            <p>{unit}</p>
          </div>
          <button className={buttonClass} onClick={handleSubmit} disabled={!inputValue}>
            저장하기
          </button>
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default Popup;
