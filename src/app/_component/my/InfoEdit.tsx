import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./InfoEdit.module.css";
import Box from "@/components/Box";
import Toast from "@/components/Toast";
import ResetPopup from "./ResetPopup";
import ResetBottomSheet from "./ResetBottomSheet";

export default function InfoEdit() {
  const [initialPaymentDay, setInitialPaymentDay] = useState<number | null>(null);
  const [initialNumResidents, setInitialNumResidents] = useState<number | null>(null);
  const [paymentDay, setPaymentDay] = useState<number | null>(null);
  const [numResidents, setNumResidents] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showResetPopup, setShowResetPopup] = useState<boolean>(false);
  const [showResetBottomSheet, setShowResetBottomSheet] = useState<boolean>(false); // ResetBottomSheet 상태 추가

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const residents = Array.from({ length: 9 }, (_, i) => i + 1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handlePaymentDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentDay(Number(event.target.value));
  };

  const handleResidentsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newResidents = value === "10명 이상" ? 10 : Number(value);

    if (newResidents !== numResidents) {
      setShowResetBottomSheet(true);
    }

    setNumResidents(newResidents);
  };

  const isFormModified = paymentDay !== initialPaymentDay || numResidents !== initialNumResidents;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/my`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          const { householdMembers, electricityDueDate } = response.data.data;
          setInitialNumResidents(householdMembers);
          setInitialPaymentDay(electricityDueDate);
          setNumResidents(householdMembers);
          setPaymentDay(electricityDueDate);
        } else {
          console.error("사용자 정보가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    if (!isFormModified) return;

    setIsSubmitting(true);
    try {
      const payload = {
        householdMembers: numResidents || 0,
        electricityDueDate: paymentDay || 0
      };

      const response = await axios.patch(`${API_URL}/users/mod-info`, payload, {
        withCredentials: true
      });

      if (response.data && response.data.success) {
        console.log("정보가 수정되었습니다.");
        setInitialPaymentDay(paymentDay);
        setInitialNumResidents(numResidents);
        setToastMessage("정보가 수정되었습니다.");
        setTimeout(() => setToastMessage(""), 3000);
      } else {
        console.error("정보 수정에 실패했습니다.");
        setToastMessage("정보 수정에 실패했습니다.");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (error) {
      console.error("정보 수정 중 오류가 발생했습니다:", error);
      setToastMessage("정보 수정 중 오류가 발생했습니다.");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
  //초기화 팝업
  const handleResetClick = () => {
    setShowResetPopup(true);
  };

  const handleClosePopup = () => {
    setShowResetPopup(false);
  };

  const handleCloseBottomSheet = () => {
    setShowResetBottomSheet(false);
  };
  return (
    <>
      <div className={styles.bodyWrapper}>
        <div className={styles.bodyContainer}>
          <Box minHeight="150px">
            <div className={styles.boxContainer}>
              <p className={styles.optionMent}>나의 전기요금 납부일은</p>
              <p className={styles.selectMent}>
                매월
                <select
                  className={`${styles.dropDown} ${paymentDay === null ? styles.placeholder : styles.selected}`}
                  value={paymentDay || ""}
                  onChange={handlePaymentDayChange}
                  disabled={isSubmitting}
                >
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day}일
                    </option>
                  ))}
                </select>
                이에요
              </p>
            </div>
          </Box>

          <Box minHeight="150px">
            <div className={styles.boxContainer}>
              <p className={styles.optionMent}>나는 현재 나를 포함</p>
              <p className={styles.selectMent}>
                총
                <select
                  className={`${styles.dropDown} ${numResidents === null ? styles.placeholder : styles.selected}`}
                  value={
                    numResidents === null ? "" : numResidents === 10 ? "10명 이상" : numResidents
                  }
                  onChange={handleResidentsChange}
                  disabled={isSubmitting}
                >
                  {residents.map(count => (
                    <option key={count} value={count}>
                      {count}명
                    </option>
                  ))}
                  <option value="10명 이상">10명 이상</option>
                </select>
                과 거주 중이에요
              </p>
            </div>
          </Box>
        </div>
        <div className={styles.btnWrap}>
          <button
            type="button"
            className={`${styles.homeBtn} ${isFormModified ? styles.activeBtn : styles.inactiveBtn}`}
            onClick={handleSubmit}
            disabled={!isFormModified || isSubmitting}
          >
            수정하기
          </button>

          <div className={styles.resetBtn} onClick={handleResetClick}>
          기존 전기요금 초기화 하기
          </div>
        </div>
        {toastMessage && <Toast message={toastMessage} />}
      </div>
      {showResetPopup && <ResetPopup onClose={handleClosePopup} />}
      {showResetBottomSheet && <ResetBottomSheet onClose={handleCloseBottomSheet} />}
    </>
  );
}
