import React, { useState } from "react";
import axios from "axios";
import styles from "./ResetPopup.module.css";
import IconWarn from "@/../public/icon/warning.svg";

interface ResetPopupProps {
  onClose: () => void;
}

type PopupType = "main" | "email" | "noPoints";

const ResetPopup: React.FC<ResetPopupProps> = ({ onClose }) => {
  const [currentPopup, setCurrentPopup] = useState<PopupType>("main");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const closeAllPopups = () => {
    setCurrentPopup("main");
    onClose();
  };

  const handleResetClick = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.delete(`${API_URL}/power/reset`, {
        withCredentials: true
      });

      if (response.data && response.data.success) {
        console.log("초기화가 완료되었습니다.");
        alert("초기화가 완료되었습니다."); // 모바일 테스트 후 수정
        closeAllPopups();
      } else {
        setErrorMessage("초기화에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setErrorMessage("초기화 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {currentPopup === "main" && (
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.popup} onClick={e => e.stopPropagation()}>
            <div className={styles.popupBox}>
              <IconWarn style={{ width: "5.1rem", height: "5.1rem" }} />{" "}
              <p className={styles.warningMent}>한 번 삭제된 데이터는 복구할 수 없습니다.</p>
              <p className={styles.resetMent}>초기화 하시겠어요?</p>
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              <div className={styles.btnContainer}>
                <button className={styles.closeBtn} onClick={onClose} disabled={isSubmitting}>
                  취소하기
                </button>
                <button
                  className={styles.confirmBtn}
                  onClick={handleResetClick}
                  disabled={isSubmitting}
                >
                  초기화하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPopup;
