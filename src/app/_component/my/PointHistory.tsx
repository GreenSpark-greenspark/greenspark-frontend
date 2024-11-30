"use client";
import React, { useState } from "react";
import styles from "./PointHistory.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";

export default function PointHistory() {
  const days: string[] = ["1개월", "6개월", "1년"];
  const [paymentDay, setPaymentDay] = useState<string>("");

  const handlePaymentDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentDay(event.target.value);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <select
            className={`${styles.dropDown} ${paymentDay === "" ? styles.placeholder : styles.selected}`}
            value={paymentDay}
            onChange={handlePaymentDayChange}
          >
            <option value="" disabled>
              - 개월
            </option>
            {days.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <div className={styles.textPoint}>
            <p>1,450</p> <IconPoint className={styles.iconPoint} />
          </div>
        </div>
        <div className={styles.historyWrap}>
          <div className={styles.historyContainer}>
            <div className={styles.pointLeftContainer}>
              <p className={styles.textPointSmall}>09. 07</p>
              <p className={styles.textPointMiddle}>기프티콘 구매</p>
            </div>
            <div className={styles.pointRightContainer}>
              <div className={styles.textPointMiddle}>
                <p>+ 100</p> <IconPoint className={styles.iconPointMiddle} />
              </div>
              <div className={styles.textPointSmall}>
                <p>300</p> <IconPoint className={styles.iconPointSmall} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
