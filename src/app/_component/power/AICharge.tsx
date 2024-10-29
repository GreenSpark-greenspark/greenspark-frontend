import React, { useEffect, useState } from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";
interface ChargeData {
  currentMonth: number;
  lastMonth: number | null;
}

type DifferenceType = "increase" | "unchanged" | "decrease" | "noLastMonth";

export default function AICharge() {
  const [chargeData, setChargeData] = useState<ChargeData | null>(null);
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noLastMonth");
  const [currentMonthLabel, setcurrentMonthLabel] = useState<string>("");
  const [previousMonthLabel, setPreviousMonthLabel] = useState<string>("");

  useEffect(() => {
    const now = new Date();

    // 이번달 날짜
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthYear = currentMonthDate.getFullYear();
    const currentMonth = currentMonthDate.getMonth() + 1;
    setcurrentMonthLabel(
      `${currentMonthYear}년 ${currentMonth < 10 ? `0${currentMonth}` : currentMonth}월`
    ); // 09월 처럼 보이게 하기 위해

    // 저번달 날짜
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthYear = lastMonthDate.getFullYear();
    const lastMonth = lastMonthDate.getMonth() + 1;
    setPreviousMonthLabel(`${lastMonthYear}년 ${lastMonth < 10 ? `0${lastMonth}` : lastMonth}월`);
    const mockData: ChargeData = {
      currentMonth: 3222,
      lastMonth: 5814
    };

    setChargeData(mockData);

    if (mockData.lastMonth === null) {
      setDifferenceType("noLastMonth");
    } else {
      const difference = mockData.currentMonth - mockData.lastMonth;
      setDifferenceType(difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease");
    }
  }, []);

  // 요금 변동 메시지 설정
  const renderComment = () => {
    if (!chargeData) return null;

    const { currentMonth, lastMonth } = chargeData;
    const difference = lastMonth ? currentMonth - lastMonth : 0;

    switch (differenceType) {
      case "noLastMonth":
        return <p className={styles.commentText}>{previousMonthLabel} 전기 요금을 입력해주세요!</p>;
      case "increase":
        return (
          <p className={styles.commentText}>
            전월에 비해 <span className={styles.commentRed}>{difference.toLocaleString()}원</span>{" "}
            증가할 것으로 예상돼요!
          </p>
        );
      case "unchanged":
        return (
          <p className={styles.commentText}>
            전월과 <span className={styles.commentGreen}>같을</span> 것으로 예상돼요!
          </p>
        );
      case "decrease":
        return (
          <p className={styles.commentText}>
            전월에 비해{" "}
            <span className={styles.commentBlue}>{Math.abs(difference).toLocaleString()}원</span>{" "}
            감소할 것으로 예상돼요!
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <p className={styles.title}>AI가 분석하는 이번달 예상요금</p>
      <div className={styles.wrap}>
        <Box>
          <p className={styles.text_normal}>
            이번달<span className={styles.text_bold}> ({currentMonthLabel}) </span>예상 요금은..
          </p>
          <p className={styles.cost}>
            <span className={styles.costGreen}>
              {chargeData ? chargeData.currentMonth.toLocaleString() : "?,???"}
            </span>{" "}
            원
          </p>
          <div className={styles.comment}>
            <IconComment className={styles.iconComment} />
            {renderComment()}
          </div>
        </Box>
      </div>
    </>
  );
}
