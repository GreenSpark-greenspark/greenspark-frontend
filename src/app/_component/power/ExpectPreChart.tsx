import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import styles from "./expectPreCost.module.css";
import { getDateLabel } from "@/utils/getDateLabels";
import TipMentIconBig from "@/../public/icon/power_tipMent_big.svg";
import TipMentIconSmall from "@/../public/icon/power_tipMent_small.svg";
import LoadingDots from "@/components/LoadingDots";

interface ChargeData {
  lastMonth: number | null;
  twoMonthsAgo: number | null;
  expectedCost: number | null;
  threeMonthsAgo: number | null;
}

type DifferenceType =
  | "increase"
  | "unchanged"
  | "decrease"
  | "noPreMonth"
  | "noCurrentMonth"
  | "noMonths";

function ExpectPreChart() {
  const [chargeData, setChargeData] = useState<ChargeData>({
    lastMonth: null,
    twoMonthsAgo: null,
    expectedCost: null,
    threeMonthsAgo: null
  });
  const [differenceType, setDifferenceType] = useState<DifferenceType>("noMonths");
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;

  useEffect(() => {
    const fetchCostData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/power/expect/${userId}`);
        if (response.data.success) {
          const { expected_cost, last_month_cost, two_month_ago_cost, three_months_ago_cost } =
            response.data.data;

          setChargeData({
            lastMonth: last_month_cost === 0 ? null : last_month_cost,
            twoMonthsAgo: two_month_ago_cost === 0 ? null : two_month_ago_cost,
            threeMonthsAgo: three_months_ago_cost === 0 ? null : three_months_ago_cost,
            expectedCost: expected_cost === 0 ? null : expected_cost
          });
        } else {
          console.error("전월 요금 데이터 API 호출 실패:", response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCostData();
  }, [API_URL, userId]);

  const determineDifferenceType = (pre: number | null, current: number | null): DifferenceType => {
    if (pre === null && current === null) return "noMonths";
    if (pre === null) return "noPreMonth";
    if (current === null) return "noCurrentMonth";
    const difference = current - pre;
    return difference > 0 ? "increase" : difference === 0 ? "unchanged" : "decrease";
  };
  // 요금에 따라 스타일 설정
  const getChartColorClass = (cost: number | null) => {
    switch (true) {
      case cost === 0:
        return styles.chartSection0;
      case cost && cost <= 5000:
        return styles.chartSection1;
      case cost && cost <= 10000:
        return styles.chartSection2;
      case cost && cost <= 15000:
        return styles.chartSection3;
      case cost && cost > 15000:
        return styles.chartSection4;
      default:
        return "";
    }
  };
  // 클릭 시 실행
  const [preCost, setPreCost] = useState<number | null>(null);
  const [currentCost, setCurrentCost] = useState<number | null>(null);

  const [preMonthLabel, setPreMonthLabel] = useState("");
  const [currentMonthLabel, setCurrentMonthLabel] = useState("");
  const handleChartClick = (type: "twoMonth" | "lastMonth" | "currentMonth") => {
    let pre: number | null;
    let current: number | null;

    switch (type) {
      case "twoMonth":
        pre = chargeData.threeMonthsAgo;
        current = chargeData.twoMonthsAgo;
        setPreMonthLabel(getDateLabel("threeMonths").monthLabel);
        setCurrentMonthLabel(getDateLabel("twoMonths").monthLabel);
        break;
      case "lastMonth":
        pre = chargeData.twoMonthsAgo;
        current = chargeData.lastMonth;
        setPreMonthLabel(getDateLabel("twoMonths").monthLabel);
        setCurrentMonthLabel(getDateLabel("last").monthLabel);
        break;
      case "currentMonth":
        pre = chargeData.lastMonth;
        current = chargeData.expectedCost;
        setPreMonthLabel(getDateLabel("last").monthLabel);
        setCurrentMonthLabel(getDateLabel("current").monthLabel);
        break;
      default:
        pre = null;
        current = null;
    }

    setPreCost(pre);
    setCurrentCost(current);
    setDifferenceType(determineDifferenceType(pre, current));
  };

  if (isLoading) {
    return (
      <div className={styles.LoadingWrapper}>
        <LoadingDots />
      </div>
    );
  }

  const currentMonthDate = getDateLabel("current");
  const lastMonthDate = getDateLabel("last");
  const twoMonthsDate = getDateLabel("twoMonths");
  const threeMonthsDate = getDateLabel("threeMonths");

  // 차이 계산
  const calculateDifference = () => {
    if (preCost != null && currentCost != null) {
      return currentCost - preCost;
    }
    return null;
  };

  const difference = calculateDifference();

  const renderComment = () => {
    switch (differenceType) {
      case "noMonths":
        return <>파워를 입력해주세요!</>;
      case "noPreMonth":
        return (
          <>
            <p>
              {`${currentMonthLabel}월 요금은 `}
              <span className={styles.costText}>{currentCost}원이에요!</span>
              <br /> 전달 파워를 입력하면 <br />더 많은 정보를 보여드릴게요!
            </p>
          </>
        );
      case "noCurrentMonth":
        return <>{`${currentMonthLabel}월 파워를 입력해주세요!`}</>;
      case "increase":
        return (
          <>
            <p>
              {`${preMonthLabel}월에 비해 `}
              <span className={styles.costRed}>{Math.abs(difference!).toLocaleString()}원 </span>
              증가했어요!
              <br />
              조금 더 전기를 아껴보는 건 어떨까요?
              <br />
              에너지 백과를 통해 다양한 팁을 살펴보아요!
            </p>
          </>
        );
      case "unchanged":
        return (
          <>
            <p>
              {`${preMonthLabel}월과 `}
              <span className={styles.costGreen}>같은</span> 전기사용량이네요!
              <br />
              조금 더 아껴서 다음 달에는 <br />
              절약해보는 건 어떨까요?
              <br /> 에너지 백과를 통해 다양한 팁을 살펴보아요!
            </p>
          </>
        );
      case "decrease":
        return (
          <>
            <p>
              {`${preMonthLabel}월에 비해 `}
              <span className={styles.costBlue}>{Math.abs(difference!).toLocaleString()}원 </span>
              감소했어요!
              <br />
              아주 잘하고 있군요!
              <br />
              앞으로도 그린스파크와 함께 더 나은
              <br /> 전력소비 해보아요!
            </p>
          </>
        );
      default:
        return <>정보를 입력해주세요!</>;
    }
  };
  //   팁멘트 아이콘
  const TipMentIcon = () => {
    if (differenceType === "noMonths" || differenceType === "noCurrentMonth") {
      return <TipMentIconSmall style={{ width: "24.3rem", height: "6rem" }} />;
    }
    return <TipMentIconBig style={{ width: "24.3rem", height: "9.5rem" }} />;
  };
  return (
    <>
      <div className={styles.chartContainer}>
        {/* 전전월 */}
        <div className={styles.chartUnit} onClick={() => handleChartClick("twoMonth")}>
          <p
            className={`${styles.boxCost} ${chargeData?.twoMonthsAgo === null ? styles.costText : ""}`}
          >
            {chargeData?.twoMonthsAgo?.toLocaleString() ?? "?,???"}원
          </p>
          <div className={`${styles.chartColor} ${getChartColorClass(chargeData.twoMonthsAgo)}`}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>{`${threeMonthsDate.monthLabel}월 대비`}</p>
              <p className={styles.costText}>
                <span
                  className={
                    chargeData?.threeMonthsAgo &&
                    chargeData.twoMonthsAgo &&
                    chargeData.twoMonthsAgo > chargeData.threeMonthsAgo // 모두 존재, 증가
                      ? styles.costRed
                      : chargeData?.threeMonthsAgo &&
                          chargeData.twoMonthsAgo &&
                          chargeData.twoMonthsAgo < chargeData.threeMonthsAgo // 모두 존재, 감소
                        ? styles.costBlue
                        : styles.costText // 기본
                  }
                >
                  {chargeData?.threeMonthsAgo && chargeData.twoMonthsAgo
                    ? chargeData.expectedCost === chargeData.threeMonthsAgo
                      ? "동일"
                      : `${chargeData.twoMonthsAgo > chargeData.threeMonthsAgo ? "+" : "-"}${Math.abs(
                          chargeData.twoMonthsAgo - chargeData.threeMonthsAgo
                        ).toLocaleString()}원`
                    : "?,???원"}
                </span>
              </p>
            </div>
          </div>
          <p className={styles.monthLabel}>{`${twoMonthsDate.monthLabel}월`}</p>
        </div>
        {/* 전월 */}
        <div className={styles.chartUnit} onClick={() => handleChartClick("lastMonth")}>
          <p
            className={`${styles.boxCost} ${chargeData?.lastMonth === null ? styles.costText : ""}`}
          >
            {chargeData?.lastMonth?.toLocaleString() ?? "?,???"}원
          </p>
          <div className={`${styles.chartColor} ${getChartColorClass(chargeData.lastMonth)}`}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>{`${twoMonthsDate.monthLabel}월 대비`}</p>
              <p className={styles.costText}>
                <span
                  className={
                    chargeData?.twoMonthsAgo &&
                    chargeData.lastMonth &&
                    chargeData.lastMonth > chargeData.twoMonthsAgo // 모두 존재, 증가
                      ? styles.costRed
                      : chargeData?.twoMonthsAgo &&
                          chargeData.lastMonth &&
                          chargeData.lastMonth < chargeData.twoMonthsAgo // 모두 존재, 감소
                        ? styles.costBlue
                        : styles.costText // 기본
                  }
                >
                  {chargeData?.twoMonthsAgo && chargeData.lastMonth
                    ? chargeData.lastMonth === chargeData.twoMonthsAgo
                      ? "동일"
                      : `${chargeData.lastMonth > chargeData.twoMonthsAgo ? "+" : "-"}${Math.abs(
                          chargeData.lastMonth - chargeData.twoMonthsAgo
                        ).toLocaleString()}원`
                    : "?,???원"}
                </span>
              </p>
            </div>
          </div>
          <p className={styles.monthLabelClick}>{`${lastMonthDate.monthLabel}월`}</p>
        </div>
        {/* 예상요금 */}
        <div className={styles.chartUnit} onClick={() => handleChartClick("currentMonth")}>
          <p className={styles.infoText}>예상요금</p>
          <p
            className={`${styles.boxCost} ${chargeData?.expectedCost === null ? styles.costText : ""}`}
          >
            {chargeData?.expectedCost?.toLocaleString() ?? "?,???"}원
          </p>
          <div className={`${styles.chartColor} ${getChartColorClass(chargeData.expectedCost)}`}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>
                {chargeData?.expectedCost === 0
                  ? "파워 입력 부족"
                  : `${lastMonthDate.monthLabel}월 대비`}
              </p>
              <p className={styles.costText}>
                {chargeData?.expectedCost === 0 ? (
                  <span className={styles.costText}>파워 입력 부족</span>
                ) : (
                  <span
                    className={
                      chargeData?.lastMonth &&
                      chargeData.expectedCost &&
                      chargeData.expectedCost > chargeData.lastMonth // 모두 존재, 증가
                        ? styles.costRed
                        : chargeData?.lastMonth &&
                            chargeData.expectedCost &&
                            chargeData.expectedCost < chargeData.lastMonth // 모두 존재, 감소
                          ? styles.costBlue
                          : styles.costText // 기본
                    }
                  >
                    {chargeData?.lastMonth && chargeData.expectedCost
                      ? chargeData.expectedCost === chargeData.lastMonth
                        ? "동일"
                        : `${chargeData.expectedCost > chargeData.lastMonth ? "+" : "-"}${Math.abs(
                            chargeData.expectedCost - chargeData.lastMonth
                          ).toLocaleString()}원`
                      : "?,???원"}
                  </span>
                )}
              </p>
            </div>
          </div>
          <p className={styles.monthLabel}>{`${currentMonthDate.monthLabel}월`}</p>
        </div>
      </div>
      <div className={styles.tipContainer}>
        <TipMentIcon />
        <div
          className={`${styles.tipMent} ${
            differenceType === "noMonths" || differenceType === "noCurrentMonth"
              ? styles.tipMentSmall
              : styles.tipMentBig
          }`}
        >
          {renderComment()}
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(ExpectPreChart), { ssr: false });
