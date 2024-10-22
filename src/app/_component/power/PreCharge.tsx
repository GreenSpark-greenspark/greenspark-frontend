import React from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";

export default function PreCharge() {
  return (
    <>
      <p className={styles.title}>저번달 요금</p>
      <div className={styles.wrap}>
        <Box>그래프</Box>
      </div>
    </>
  );
}
