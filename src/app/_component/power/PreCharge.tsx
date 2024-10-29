import React, { useEffect, useState } from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";

interface ChargeData {
  lastMonth: number;
  twoMonthsAgo: number | null;
}

type DifferenceType = "increase" | "unchanged" | "decrease" | "noLastMonth";

export default function PreCharge() {
  const [chargeData, setChargeData] = useState<ChargeData | null>(null);
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noLastMonth");
  const [previousMonthLabel, setPreviousMonthLabel] = useState<string>("");
  const [twoMonthsAgoLabel, setTwoMonthsAgoLabel] = useState<string>("");

  useEffect(() => {
    const now = new Date();

    // 저번달 날짜
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthYear = lastMonthDate.getFullYear();
    const lastMonth = lastMonthDate.getMonth() + 1;
    setPreviousMonthLabel(`${lastMonthYear}년 ${lastMonth < 10 ? `0${lastMonth}` : lastMonth}월`); // 09월 처럼 보이게 하기 위해

    // 저저번달 날짜
    const twoMonthsAgoDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const twoMonthsAgoYear = twoMonthsAgoDate.getFullYear();
    const twoMonthsAgoMonth = twoMonthsAgoDate.getMonth() + 1;
    setTwoMonthsAgoLabel(
      `${twoMonthsAgoYear}년 ${twoMonthsAgoMonth < 10 ? `0${twoMonthsAgoMonth}` : twoMonthsAgoMonth}월`
    );

    const mockData: ChargeData = {
      lastMonth: 3222,
      twoMonthsAgo: null
    };

    setChargeData(mockData);

    if (mockData.twoMonthsAgo === null) {
      setDifferenceType("noLastMonth");
    } else {
      const difference = mockData.lastMonth - mockData.twoMonthsAgo;
      setDifferenceType(difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease");
    }
  }, []);

  // 요금 변동 메시지 설정
  const renderComment = () => {
    if (!chargeData) return null;

    const { lastMonth, twoMonthsAgo } = chargeData;
    const difference = twoMonthsAgo ? lastMonth - twoMonthsAgo : 0;

    switch (differenceType) {
      case "noLastMonth":
        return <p className={styles.commentText}>{twoMonthsAgoLabel} 전기 요금을 입력해주세요!</p>;
      case "increase":
        return (
          <p className={styles.commentText}>
            전월에 비해 <span className={styles.commentRed}>{difference.toLocaleString()}원</span>{" "}
            증가했어요!
          </p>
        );
      case "unchanged":
        return (
          <p className={styles.commentText}>
            전월과 <span className={styles.commentGreen}>같은</span> 전기 요금이네요!
          </p>
        );
      case "decrease":
        return (
          <p className={styles.commentText}>
            전월에 비해{" "}
            <span className={styles.commentBlue}>{Math.abs(difference).toLocaleString()}원</span>{" "}
            감소했어요!
          </p>
        );
      default:
        return null;
    }
  };

  // 케이스별 tipMent 메시지 설정
  const renderTipMent = () => {
    switch (differenceType) {
      case "noLastMonth":
        return "비교할 데이터가 없어요. 전기 요금 입력 후 절약 팁을 확인해 보세요!";
      case "increase":
        return "조금 더 전기를 아껴보는 건 어떨까요? 에너지 백과를 통해 다양한 팁을 살펴보아요!";
      case "unchanged":
        return "조금 더 아껴서 다음 달에는 절약해보는 건 어떨까요? 에너지 백과를 통해 다양한 팁을 살펴보아요!";
      case "decrease":
        return "아주 잘하고 있군요:) 앞으로도 그린스파크와 더 나은 전력소비 해보아요!";
      default:
        return "";
    }
  };

  return (
    <>
      <p className={styles.title}>저번달 요금</p>
      <div className={styles.wrap}>
        <Box>
          <p className={styles.text_normal}>
            저번달<span className={styles.text_bold}> ({previousMonthLabel}) </span>의 전기 요금
          </p>
          <p className={styles.cost}>
            <span className={styles.costGreen}>
              {chargeData ? chargeData.lastMonth.toLocaleString() : "?,???"}
            </span>{" "}
            원
          </p>
          <div className={styles.compareContainer}>
            <div className={styles.comment}>
              <IconComment className={styles.iconComment} />
              {renderComment()}
            </div>
            <p className={styles.tipMent}>{renderTipMent()} </p>
          </div>
        </Box>
      </div>
    </>
  );
}
