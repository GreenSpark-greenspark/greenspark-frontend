import React from "react";
import { useRouter } from "next/navigation";
import styles from "../power/power.common.module.css";
import Box from "@/components/Box";

export default function HomeEncyclopedia() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/book");
  };
  return (
    <>
      <p className={styles.title}>에너지 백과️</p>

      <div className={styles.wrap}>
        <Box>
          <div className={styles.bodyContainer}>
            <p className={styles.text_title}>에너지 절약 팁을 제공해드려요!</p>
            <p className={styles.text_normal}>
              오늘은 <span className={styles.appliancsGreen}>에어컨 </span>절약 팁에 대해
              알아볼까요?
            </p>
          </div>
          <button type="button" className={styles.btn} onClick={handleNavigate}>
            보러가기
          </button>
        </Box>
      </div>
    </>
  );
}
