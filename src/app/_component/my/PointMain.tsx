"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
    router.push(`/shop/list`);
  };
  const [point, setPoint] = useState<number>(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`${API_URL}/point`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          setPoint(response.data.data);
        } else {
          console.error("포인트 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("포인트 데이터 가져오기 실패:", error);
      }
    };
    fetchPoints();
  }, []);
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <p className={styles.pointTitle}>사용 가능 포인트</p>
          <div className={styles.textPoint}>
            <p>{point.toLocaleString()}</p> <IconPoint className={styles.iconPoint} />
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
