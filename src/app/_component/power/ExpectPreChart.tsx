import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import styles from "./expectPreCost.module.css";
import { getDateLabel } from "@/utils/getDateLabels";
import TipMentIcon from "@/../public/icon/power_tipMent_big.svg";

interface ChargeData {
  lastMonth: number | null;
  twoMonthsAgo: number | null;
  expectedCost: number | null;
}

type DifferenceType =
  | "increase"
  | "unchanged"
  | "decrease"
  | "notwoMonthAgo"
  | "noLastMonth"
  | "noMonths";

function ExpectPreChart() {
  const [chargeData, setChargeData] = useState<ChargeData>({
    lastMonth: null,
    twoMonthsAgo: null,
    expectedCost: null
  });
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noMonths");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const lastMonthResponse = await axios.get(`${API_URL}/power/last-month/${userId}`);
        if (lastMonthResponse.data.success) {
          const { last_month_cost, month_before_last_cost } = lastMonthResponse.data.data;

          setChargeData(prevData => ({
            ...prevData,
            lastMonth: last_month_cost === 0 ? null : last_month_cost,
            twoMonthsAgo: month_before_last_cost === 0 ? null : month_before_last_cost
          }));

          // differenceType 설정
          if (last_month_cost === 0 && month_before_last_cost === 0) {
            setDifferenceType("noMonths");
          } else if (last_month_cost === 0) {
            setDifferenceType("noLastMonth");
          } else if (month_before_last_cost === 0) {
            setDifferenceType("notwoMonthAgo");
          } else {
            const difference = last_month_cost - month_before_last_cost;
            setDifferenceType(
              difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease"
            );
          }
        } else {
          console.error("전월 요금 데이터 API 호출 실패:", lastMonthResponse.data.message);
        }

        const expectedCostResponse = await axios.get(`${API_URL}/power/expect/${userId}`);
        if (expectedCostResponse.data.success) {
          const { expected_cost } = expectedCostResponse.data.data;

          setChargeData(prevData => ({
            ...prevData,
            expectedCost: expected_cost === 0 ? null : expected_cost
          }));
        } else {
          console.error("예상 요금 API 호출 실패:", expectedCostResponse.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL, userId]);

  const currentMonthDate = getDateLabel("current");
  const lastMonthDate = getDateLabel("last");
  const twoMonthsDate = getDateLabel("twoMonths");

  const renderComment = () => {
    if (!chargeData) return null;

    const { lastMonth, twoMonthsAgo } = chargeData;

    if (lastMonth === null) {
      return null;
    }

    const difference = twoMonthsAgo !== null ? lastMonth - twoMonthsAgo : 0;

    switch (differenceType) {
      case "noMonths":
        return <div className={styles.commentText}>정보를 입력해주세요!</div>;
      case "noLastMonth":
        return (
          <div className={styles.commentText}>
            {`${lastMonthDate.monthLabel}월 정보를 입력해주세요!`}
          </div>
        );
      case "notwoMonthAgo":
        return (
          <div className={styles.commentText}>
            {`${twoMonthsDate.monthLabel}월 전기 요금을 입력해주세요!`}
          </div>
        );
      case "increase":
        return (
          <div className={styles.commentText}>
            <span>{`${twoMonthsDate.monthLabel}월에 비해 `}</span>
            <span className={styles.costRed}>
              {Math.abs(difference).toLocaleString()}원 증가했어요!
            </span>
            <br />
            <span>조금 더 전기를 아껴보는 건 어떨까요?</span>
            <br />
            <span>에너지 백과를 통해 다양한 팁을 살펴보아요!</span>
          </div>
        );
      case "unchanged":
        return (
          <div className={styles.commentText}>
            <span>{`${twoMonthsDate.monthLabel}월에 비해 `}</span>
            <span className={styles.costGreen}>같은 전기 요금이네요!</span>
            <br />
            <span>조금 더 아껴서 다음 달에는</span>
            <br />
            <span>에너지 백과를 통해 다양한 팁을 살펴보아요!</span>
          </div>
        );
      case "decrease":
        return (
          <div className={styles.commentText}>
            <span>{`${twoMonthsDate.monthLabel}월에 비해 `}</span>
            <span className={styles.costBlue}>
              {Math.abs(difference).toLocaleString()}원 감소했어요!
            </span>
            <br />
            <span>아주 잘하고 있군요!</span>
            <br />
            <span>앞으로도 그린스파크와 함께 더 나은 전력소비 해보아요!</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.chartContainer}>
        {/* 전전월 */}
        <div className={styles.chartUnit}>
          <p className={styles.boxCost}>
            {chargeData?.twoMonthsAgo?.toLocaleString() ?? "?,???"}원
          </p>
          <div className={styles.chartColor}></div>
          <p className={styles.monthLabel}>{`${twoMonthsDate.monthLabel}월`}</p>
        </div>
        {/* 전월 */}
        <div className={styles.chartUnit}>
          <p className={styles.boxCost}>{chargeData?.lastMonth?.toLocaleString() ?? "?,???"}원</p>
          <div className={styles.chartColor}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>{`${twoMonthsDate.monthLabel}월 대비`}</p>
              <p className={styles.costText}>
                <span
                  className={
                    differenceType === "decrease"
                      ? styles.costBlue
                      : differenceType === "increase"
                        ? styles.costRed
                        : styles.costGreen
                  }
                >
                  {differenceType === "unchanged"
                    ? "동일"
                    : `${differenceType === "decrease" ? "-" : "+"}${Math.abs(
                        (chargeData?.lastMonth ?? 0) - (chargeData?.twoMonthsAgo ?? 0)
                      ).toLocaleString()}원`}
                </span>
              </p>
            </div>
          </div>
          <p className={styles.lastMonthLabel}>{`${lastMonthDate.monthLabel}월`}</p>
        </div>
        {/* 예상요금 */}
        <div className={styles.chartUnit}>
          <p className={styles.infoText}>예상요금</p>
          <p className={styles.boxCost}>
            {chargeData?.expectedCost?.toLocaleString() ?? "?,???"}원
          </p>
          <div className={styles.chartColor}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>
                {chargeData?.expectedCost === 0
                  ? "파워 입력 부족"
                  : `${lastMonthDate.monthLabel}월 대비`}
              </p>
              <p className={styles.costText}>
                {chargeData?.expectedCost === 0 ? (
                  <span className={styles.costRed}>파워 입력 부족</span>
                ) : (
                  <span
                    className={
                      chargeData?.lastMonth &&
                      chargeData.expectedCost &&
                      chargeData.expectedCost > chargeData.lastMonth
                        ? styles.costRed
                        : chargeData?.lastMonth &&
                            chargeData.expectedCost &&
                            chargeData.expectedCost < chargeData.lastMonth
                          ? styles.costBlue
                          : styles.costGreen
                    }
                  >
                    {chargeData?.lastMonth && chargeData.expectedCost
                      ? chargeData.expectedCost === chargeData.lastMonth
                        ? "동일"
                        : `${chargeData.expectedCost > chargeData.lastMonth ? "+" : "-"}${Math.abs(
                            chargeData.expectedCost - chargeData.lastMonth
                          ).toLocaleString()}원`
                      : "?,???"}
                  </span>
                )}
              </p>
            </div>
          </div>
          <p className={styles.monthLabel}>{`${currentMonthDate.monthLabel}월`}</p>
        </div>
      </div>
      <div className={styles.tipContainer}>
        <TipMentIcon style={{ width: "24.3rem", height: "9.5rem" }} />
        <p className={styles.tipMent}>{renderComment()}</p>
      </div>
    </>
  );
}
export default dynamic(() => Promise.resolve(ExpectPreChart), { ssr: false });
