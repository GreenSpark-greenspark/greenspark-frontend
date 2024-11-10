import React from "react";
import styles from "./expectPreCost.module.css";
import { getDateLabel } from "@/./utils/getDateLabels";

export default function ExpectPreChart() {
  const currentMonthDate = getDateLabel("current");
  const lastMonthDate = getDateLabel("last");
  const twoMonthsDate = getDateLabel("twoMonths");

  return (
    <>
      <div className={styles.chartContainer}>
        <div className={styles.chartUnit}>
          <p className={styles.boxCost}>50,000원</p>
          <div className={styles.chartColor}></div>
          <p className={styles.monthLabel}>{`${twoMonthsDate.monthLabel}월`}</p>
        </div>
        <div className={styles.chartUnit}>
          <p className={styles.boxCost}>50,000원</p>
          <div className={styles.chartColor}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>{`${twoMonthsDate.monthLabel}월`} 대비</p>
              <p className={styles.costText}>
                <span className={styles.costBlue}>-29,430</span>원
              </p>
            </div>
          </div>
          <p className={styles.monthLabel}>{`${lastMonthDate.monthLabel}월`}</p>
        </div>
        <div className={styles.chartUnit}>
          <p className={styles.infoText}>예상요금</p>
          <p className={styles.boxCost}>50,000원</p>
          <div className={styles.chartColor}>
            <div className={styles.chartBox}>
              <p className={styles.chartBoxText}>{`${lastMonthDate.monthLabel}월`} 대비</p>
              <p className={styles.costText}>
                <span className={styles.costBlue}>-29,430</span>원
              </p>
            </div>
          </div>
          <p className={styles.monthLabel}>{`${currentMonthDate.monthLabel}월`}</p>
        </div>
      </div>
    </>
  );
}
