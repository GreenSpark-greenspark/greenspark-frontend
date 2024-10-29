import React, { useEffect, useState } from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";

interface ChargeData {
  currentMonth: number | null;
  lastMonth: number | null;
}

type DifferenceType = "increase" | "unchanged" | "decrease" | "noLastMonth" | "noCurrentMonth";

export default function AICharge() {
  const [chargeData, setChargeData] = useState<ChargeData | null>(null);
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noLastMonth");
  const [currentMonthLabel, setCurrentMonthLabel] = useState<string>("");
  const [previousMonthLabel, setPreviousMonthLabel] = useState<string>("");

  useEffect(() => {
    const now = new Date();

    // 이번달 날짜
    const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthYear = currentMonthDate.getFullYear();
    const currentMonth = currentMonthDate.getMonth() + 1;
    setCurrentMonthLabel(
      `${currentMonthYear}년 ${currentMonth < 10 ? `0${currentMonth}` : currentMonth}월`
    );

    // 저번달 날짜
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = lastMonthDate.getMonth() + 1;
    setPreviousMonthLabel(`${lastMonth}월`);

    const mockData: ChargeData = {
      currentMonth: null,
      lastMonth: null
    };

    setChargeData(mockData);

    if (mockData.lastMonth === null) {
      setDifferenceType("noLastMonth");
    } else if (mockData.currentMonth === null) {
      setDifferenceType("noCurrentMonth");
    } else {
      const difference = mockData.currentMonth - mockData.lastMonth;
      setDifferenceType(difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease");
    }
  }, []);

  // 요금 변동 메시지 설정
  const renderComment = () => {
    if (!chargeData) return null;

    const { currentMonth, lastMonth } = chargeData;

    if (currentMonth === null) {
      return <p className={styles.commentText}>정보를 입력하면 이번 달 요금을 예상해줘요!</p>;
    }

    const difference = lastMonth !== null ? currentMonth - lastMonth : 0; // 저번달 데이터가 null이 아닐 경우만 계산

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
              {chargeData && chargeData.currentMonth !== null
                ? chargeData.currentMonth.toLocaleString()
                : "?,???"}
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
