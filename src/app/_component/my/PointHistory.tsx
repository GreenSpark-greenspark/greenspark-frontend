"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PointHistory.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";

interface PointHistoryItem {
  date: string;
  event: string;
  after_point: number;
  point_amount: number;
}

export default function PointHistory() {
  const days: string[] = ["1개월", "6개월", "1년"];
  const [paymentDay, setPaymentDay] = useState<string>("");
  const [pointHistory, setPointHistory] = useState<PointHistoryItem[]>([]);
  const [point, setPoint] = useState<number>(0);

  const handlePaymentDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentDay(event.target.value);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPointhistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/point/history`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          setPointHistory(response.data.data);
        } else {
          console.error("포인트 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("포인트 데이터 가져오기 실패:", error);
      }
    };
    fetchPointhistory();

    const fetchPoints = async () => {
      try {
        const response = await axios.get(`${API_URL}/point`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          setPoint(response.data.data);
        } else {
          console.error("포인트 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("포인트 데이터 가져오기 실패:", error);
      }
    };
    fetchPoints();
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topWrapper}>
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
              <p>{point.toLocaleString()}</p> <IconPoint className={styles.iconPoint} />
            </div>
          </div>{" "}
        </div>
        <div className={styles.historyWrap}>
          {pointHistory.map((item, index) => (
            <div key={index} className={styles.historyContainer}>
              <div className={styles.pointLeftContainer}>
                <p className={styles.textPointSmall}>
                  {new Date(item.date).toLocaleDateString("ko-KR", {
                    month: "2-digit",
                    day: "2-digit"
                  })}
                </p>
                <p className={styles.textPointMiddle}>{item.event}</p>
              </div>
              <div className={styles.pointRightContainer}>
                <div className={styles.textPointMiddle}>
                  <p>{item.point_amount > 0 ? `+ ${item.point_amount}` : item.point_amount}</p>
                  <IconPoint className={styles.iconPointMiddle} />
                </div>
                <div className={styles.textPointSmall}>
                  <p>{item.after_point}</p> <IconPoint className={styles.iconPointSmall} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
