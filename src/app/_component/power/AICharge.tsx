"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";
import { getDateLabel } from "@/./utils/getDateLabels";

interface ChargeData {
  currentMonth: number | null;
  lastMonth: number | null;
}

type DifferenceType = "increase" | "unchanged" | "decrease" | "noLastMonth" | "noCurrentMonth";

export default function AICharge() {
  const [chargeData, setChargeData] = useState<ChargeData | null>(null);
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noLastMonth");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/power/expect/${userId}`);

        if (response.data.success) {
          const data = response.data.data;

          setChargeData({
            currentMonth: data.expected_cost,
            lastMonth: data.last_month_cost
          });

          const currentMonthCost = data.expected_cost;
          const lastMonthCost = data.last_month_cost;

          if (currentMonthCost === null) {
            setDifferenceType("noCurrentMonth");
          } else if (lastMonthCost === null) {
            setDifferenceType("noLastMonth");
          } else {
            const difference = currentMonthCost - lastMonthCost;
            setDifferenceType(
              difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease"
            );
          }
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL, userId]);

  const currentMonthLabel = getDateLabel("current");
  const lastMonthLabel = getDateLabel("last");

  // 요금 변동 메시지 설정
  const renderComment = () => {
    if (!chargeData) return null;

    const { currentMonth, lastMonth } = chargeData;
    if (currentMonth === null) {
      return null;
    }

    const difference = lastMonth !== null ? currentMonth - lastMonth : 0; // 저번달 데이터가 null이 아닐 경우만 계산

    switch (differenceType) {
      case "noLastMonth":
        return (
          <p className={styles.commentText}>
            {`${lastMonthLabel.monthLabel}월`} 전기 요금을 입력해주세요!
          </p>
        );
      case "increase":
        return (
          <p className={styles.commentText}>
            저번 달에 비해{" "}
            <span className={styles.commentRed}>{difference.toLocaleString()}원</span> 증가할 것으로
            예상돼요!
          </p>
        );
      case "unchanged":
        return (
          <p className={styles.commentText}>
            저번 달과 <span className={styles.commentGreen}>비슷할</span> 것으로 예상돼요!
          </p>
        );
      case "decrease":
        return (
          <p className={styles.commentText}>
            저번 달에 비해{" "}
            <span className={styles.commentBlue}>{Math.abs(difference).toLocaleString()}원</span>{" "}
            감소할 것으로 예상돼요!
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
        return <>{`${lastMonthLabel.monthLabel}월`} 요금을 입력하면 비교할 수 있어요!</>;
      case "noCurrentMonth":
        return (
          <>
            {`${lastMonthLabel.monthLabel}월`}에 비해 얼마나 차이나는지 알고 싶다면 <br />
            이번 달 정보를 입력해주세요!
          </>
        );
      case "increase":
        return <>이번 달 요금이 증가했네요. 절약 방법을 찾아보세요!</>;
      case "unchanged":
        return <>저번 달과 비슷한 요금이에요. 다음 달엔 절약에 도전해보세요!</>;
      case "decrease":
        return <>잘하셨네요! 앞으로도 그린스파크와 함께 전력을 절약해요!</>;
      default:
        return "";
    }
  };

  return (
    <>
      <p className={styles.title}>AI가 분석하는 이번달 예상요금</p>
      <div className={styles.wrap}>
        <Box>
          <p className={styles.text_normal}>
            이번달
            <span className={styles.text_bold}>
              {" "}
              ({`${currentMonthLabel.yearLabel}년 ${currentMonthLabel.monthLabel}월`}){" "}
            </span>
            예상 요금은..
          </p>
          <p className={styles.cost}>
            <span className={styles.costGreen}>
              {chargeData && chargeData.currentMonth !== null
                ? chargeData.currentMonth.toLocaleString()
                : "?,???"}
            </span>{" "}
            원
          </p>

          <div className={styles.compareContainer}>
            {chargeData && chargeData.currentMonth !== null && (
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
