import React from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";

export default function AICharge() {
  return (
    <>
      <p className={styles.title}>AI가 분석하는 이번달 예상요금</p>
      <div className={styles.wrap}>
        <Box>그래프</Box>
      </div>
    </>
  );
}
