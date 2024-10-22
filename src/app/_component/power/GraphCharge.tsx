import React from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";

export default function GraphCharge() {
  return (
    <>
      <p className={styles.title}>한눈에 보는 내 파워</p>
      <div className={styles.wrap}>
        <Box>그래프</Box>
      </div>
    </>
  );
}
