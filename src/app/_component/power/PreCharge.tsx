"use client";
import React, { useEffect, useState } from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";
import { getDateLabel } from "@/./utils/getDateLabels";

interface ChargeData {
  lastMonth: number | null;
  twoMonthsAgo: number | null;
}

type DifferenceType = "increase" | "unchanged" | "decrease" | "notwoMonthAgo" | "noLastMonth";

export default function PreCharge() {
  const [chargeData, setChargeData] = useState<ChargeData | null>(null);
  const [differenceType, setDifferenceType] = useState<DifferenceType>("notwoMonthAgo");

  useEffect(() => {
    const mockData: ChargeData = {
      lastMonth: 3222,
      twoMonthsAgo: null
    };

    setChargeData(mockData);

    if (mockData.lastMonth === null) {
      setDifferenceType("noLastMonth");
    } else if (mockData.twoMonthsAgo === null) {
      setDifferenceType("notwoMonthAgo");
    } else {
      const difference = mockData.lastMonth - mockData.twoMonthsAgo;
      setDifferenceType(difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease");
    }
  }, []);

  const lastMonthDate = getDateLabel("last");
  const twoMonthsDate = getDateLabel("twoMonths");

  // 요금 변동 메시지 설정
  const renderComment = () => {
    if (!chargeData) return null;

    const { lastMonth, twoMonthsAgo } = chargeData;

    if (lastMonth === null) {
      return null;
    }

    const difference = twoMonthsAgo !== null ? lastMonth - twoMonthsAgo : 0;

    switch (differenceType) {
      case "notwoMonthAgo":
        return (
          <p className={styles.commentText}>
            {`${twoMonthsDate.monthLabel}월`} 전기 요금을 입력해주세요!
          </p>
        );
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
      case "notwoMonthAgo":
        return <>{`${twoMonthsDate.monthLabel}월`} 전기 요금을 입력해 전기 요금을 비교해보세요!</>;
      case "noLastMonth":
        return (
          <>
            {`${twoMonthsDate.monthLabel}월`}에 비해 증가한 요금을 알고 싶다면? <br />
            정보를 입력해주세요!
          </>
        );
      case "increase":
        return (
          <>
            조금 더 전기를 아껴보는 건 어떨까요? <br />
            에너지 백과를 통해 다양한 팁을 살펴보아요!
          </>
        );
      case "unchanged":
        return (
          <>
            조금 더 아껴서 다음 달에는 절약해보는 건 어떨까요? <br />
            에너지 백과를 통해 다양한 팁을 살펴보아요!
          </>
        );
      case "decrease":
        return (
          <>
            아주 잘하고 있군요:) <br />
            앞으로도 그린스파크와 더 나은 전력소비 해보아요!
          </>
        );
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
            저번달
            <span className={styles.text_bold}>
              {" "}
              ({`${lastMonthDate.yearLabel}년 ${lastMonthDate.monthLabel}월`}){" "}
            </span>
            의 전기 요금
          </p>
          <p className={styles.cost}>
            <span className={styles.costGreen}>
              {chargeData && chargeData.lastMonth !== null
                ? chargeData.lastMonth.toLocaleString()
                : "?,???"}
            </span>{" "}
            원
          </p>

          <div className={styles.compareContainer}>
            {chargeData && chargeData.lastMonth !== null && (
              <div className={styles.comment}>
                <IconComment className={styles.iconComment} />
                {renderComment()}
              </div>
            )}
            <p className={styles.tipMent}>{renderTipMent()}</p>
          </div>
        </Box>
      </div>
    </>
  );
}
