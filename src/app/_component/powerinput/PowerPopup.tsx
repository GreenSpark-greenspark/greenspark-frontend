import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PowerPopup.module.css";
import Toast from "@/components/Toast";
import IconClose from "@/../public/icon/popup_close.svg";

type PowerPopupProps = {
  userId: number;
  year: number;
  month: number;
  type: "cost" | "usage";
  value?: number;
  recentValue?: number;
  onClose: () => void;
  onSave: (newValue: number) => void;
};

const PowerPopup: React.FC<PowerPopupProps> = ({
  userId,
  year,
  month,
  type,
  value = 0,
  recentValue = 0, // 최근 값 초기화
  onClose,
  onSave
}) => {
  const [inputValue, setInputValue] = useState<string>(value ? value.toString() : "");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [numericInputValue, setNumericInputValue] = useState<number | null>(null); // 숫자 변환된 입력값

  const typeName = type === "cost" ? "전기요금" : "전력사용량";
  const unit = type === "cost" ? "원" : "kWh";

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

  const handleSubmit = async () => {
    if (!inputValue) {
      setToastMessage("숫자만 입력해주세요");
      return;
    }

    const numericValue = Number(inputValue);
    setNumericInputValue(numericValue); // 입력값 저장

    // 최근 값이 0이 아니고, 3배 초과인지
    if (recentValue > 0 && numericValue > recentValue * 3) {
      setShowConfirmation(true);
    } else {
      await saveValue(numericValue);
    }
  };

  const handleConfirmSave = async () => {
    if (numericInputValue !== null) {
      await saveValue(numericInputValue);
      setShowConfirmation(false);
    }
  };

  const saveValue = async (numericValue: number) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const postData =
      type === "cost"
        ? { year, month, cost: numericValue }
        : { year, month, usageAmount: numericValue };

    try {
      const response = await axios.post(`${API_URL}/power/${type}/${userId}`, postData);

      if (response.status === 200) {
        setToastMessage("저장되었습니다.");
        onSave(numericValue);
        onClose();
      } else {
        setToastMessage("저장에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("서버 오류가 발생했습니다.", error);
      setToastMessage("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleReEnter = () => {
    setShowConfirmation(false);
    setInputValue(numericInputValue?.toString() || ""); // 기존 입력값으로 되돌리기
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
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

      {showConfirmation && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <div className={styles.popupBox}>
              <p className={styles.popupTitle}>
                지난 달과 차이가 커요! <br />
                정확히 입력했나요?
              </p>
              <div className={styles.confirmationBtnContainer}>
                <button className={styles.confirmBtn} onClick={handleConfirmSave}>
                  이대로 입력하기
                </button>
                <button className={styles.reenterBtn} onClick={handleReEnter}>
                  다시 입력하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PowerPopup;
