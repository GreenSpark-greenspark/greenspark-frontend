import React from "react";
import styles from "../power/power.common.module.css";
import Box from "@/components/Box";

export default function HomeAppliances() {
  return (
    <>
      <p className={styles.title}>내 가전제품 </p>

      <div className={styles.wrap}>
        <Box>가전 컴포넌트</Box>
      </div>
    </>
  );
}
