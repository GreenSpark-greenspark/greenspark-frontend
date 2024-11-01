import React from "react";
import styles from "../power/power.common.module.css";
import Box from "@/components/Box";

export default function HomeEncyclopedia() {
  return (
    <>
      <p className={styles.title}>에너지 백과️</p>

      <div className={styles.wrap}>
        <Box>
          <p className={styles.text_title}>에너지 절약 팁을 제공해드려요!</p>
          <p className={styles.text_normal}>
            오늘은 <span className={styles.appliancsGreen}>에어컨 </span>절약 팁에 대해 알아볼까요?
          </p>
          <button type="button" className={styles.btn}>
            보러가기
          </button>
        </Box>
      </div>
    </>
  );
}
