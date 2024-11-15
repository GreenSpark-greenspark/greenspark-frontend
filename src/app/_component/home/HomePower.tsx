"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../power/power.common.module.css";
import Box from "@/components/Box";
import IconComment from "../../../../public/icon/power_comment.svg";
import { getDateLabel } from "@/./utils/getDateLabels";

interface ChargeData {
  currentMonth: number | null;
  lastMonth: number | null;
}

type DifferenceType = "increase" | "unchanged" | "decrease" | "noLastMonth" | "noCurrentMonth";

export default function HomePower() {
  const [chargeData, setChargeData] = useState<ChargeData | null>(null);
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noLastMonth");

  const currentMonthLabel = getDateLabel("current");
  const lastMonthLabel = getDateLabel("last");

  // 라우터
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/power/input");
  };

  // api 통신
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
          console.log(`예상 요금: ${currentMonthCost}`);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL, userId]);

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
        return (
          <p className={styles.commentText}>
            {`${lastMonthLabel.monthLabel}월`} 전기 요금을 입력해주세요!
          </p>
        );
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
            전월과 <span className={styles.commentGreen}>비슷할</span> 것으로 예상돼요!
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
      <p className={styles.title}>내 파워</p>
      <div className={styles.wrap}>
        <Box>
          <div className={styles.prePowerContainer}>
            <p className={styles.text_normal}>
              지난달
              <span className={styles.text_bold}>
                {" "}
                {`${lastMonthLabel.yearLabel.slice(-2)}년 ${lastMonthLabel.monthLabel}월`}
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
          </div>
          <div className={styles.powerContent}>
            <p className={styles.text_normal}>
              이번 달
              <span className={styles.text_bold}>
                {" "}
                {`${currentMonthLabel.yearLabel.slice(-2)}년 ${currentMonthLabel.monthLabel}월`}
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
            <div className={styles.comment}>
              <IconComment className={styles.iconComment} />
              {renderComment()}
            </div>
          </div>
          <button type="button" className={styles.btn} onClick={handleNavigate}>
            내 파워 입력하기
          </button>
        </Box>
      </div>
    </>
  );
}
