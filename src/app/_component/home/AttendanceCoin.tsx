import React, { useEffect, useState } from "react";
import styles from "./AttendanceCoin.module.css";
import Box from "@/components/Box";
import Iconcoin from "@/../public/icon/coin.svg";
import AttendanceModal from "./attendanceModal.tsx/AttendanceModal";
import axios from "axios";
import Toast from "@/components/Toast";

export default function AttendanceCoin() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [click, setClick] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onClick = async () => {
    if (toastMessage) {
      setToastMessage("");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/users/attendance`, {}, { withCredentials: true });

      if (res.data.data === true) {
        try {
          const res = await axios.post(
            `${API_URL}/point/update`,
            {
              pointAmount: 50,
              event: "출석체크"
            },
            { withCredentials: true }
          );
        } catch (error) {
          console.log("포인트 갱신 오류:", error);
        }
        setClick(true);
      } else {
        setToastMessage("이미 출석 체크를 하셨습니다!");
      }
    } catch (error) {
      console.log("출석 체크 오류:", error);
    }
  };

  const closeModal = () => {
    setClick(false);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <>
      <div className={styles.coinWrap}>
        <button className={styles.btn} onClick={onClick}>
          <Box>
            <div className={styles.coinContainer}>
              <p className={styles.text_normal}>하루에 한 번씩 포인트를 획득하세요!</p>
              <div className={styles.coin}>
                <Iconcoin className={styles.coinIcon} />
                <p className={styles.text_normal}>50</p>
              </div>
            </div>
          </Box>
        </button>
      </div>
      {!toastMessage && click && <AttendanceModal click={click} onClick={closeModal} />}
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}
