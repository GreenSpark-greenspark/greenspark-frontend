import React from "react";
import InfoIcon from "@/../public/icon/toast_info_icon.svg";
import styles from "./expectPreCost.module.css";

export default function ExpectPreCost() {
  return (
    <>
      <div className={styles.expectTop}>
        <div className={styles.topLeft}>
          <p className={styles.topTitle}>ㅇㅇㅇ님의 이번 전기요금은...</p>
          <div className={styles.infoContianer}>
            <InfoIcon className={styles.infoIcon} />
            <p className={styles.infoText}>
              AI 기반의 예측이므로, 정확하지 않을 수 있습니다. <br />
              더욱 정확한 예측을 원한다면 파워 빈칸을 채워주세요.
            </p>
          </div>
        </div>
        <div className={styles.topRight}>
          <div className={styles.infoDate}></div>
          <p className={styles.infoText}>납부일 4일</p>
        </div>
      </div>
    </>
  );
}
