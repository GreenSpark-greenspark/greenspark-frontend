"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./PointMain.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import IconArrow from "@/../public/icon/arrow_left.svg";

export default function PointMain() {
  const router = useRouter();

  const goToPointHistory = () => {
    router.push(`/my/history`);
  };
  const goToShop = () => {
    router.push(`/my/shop`);
  };
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <p className={styles.pointTitle}>사용 가능 포인트</p>
          <div className={styles.textPoint}>
            <p>1,450</p> <IconPoint className={styles.iconPoint} />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.goToBtn} onClick={() => goToShop()}>
            <p>포인트 사용하여 기프티콘 사러가기</p>
            <IconArrow className={styles.iconArrow} />
          </div>
          <div className={styles.goToBtn} onClick={() => goToPointHistory()}>
            <p>포인트 내역 보러가기</p>
            <IconArrow className={styles.iconArrow} />
          </div>
        </div>
      </div>
    </>
  );
}
