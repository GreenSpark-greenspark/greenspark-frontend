"use client";
import Image from "next/image";
import styles from "./AttendanceModal.module.css";
import PointIcon from "@/../public/icon/point_symbol.svg";
import { useEffect, useState } from "react";
import axios from "axios";

interface AttendanceModalProps {
  click: boolean;
  onClick: () => void;
}

export default function AttendanceModal({ click, onClick }: AttendanceModalProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [point, setPoint] = useState(0);

  useEffect(() => {
    if (click) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [click]);

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const res = await axios.get(`${API_URL}/point`, { withCredentials: true });
        if (res.data.success === true) {
          setPoint(res.data.data);
        }
      } catch (error) {
        console.log("오류 발생:", error);
      }
    };
    fetchPoint();
  }, [click]);

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.title}>출석 50포인트 획득 🎉</div>
        <div className={styles.description}>
          매일 한 번씩 <span className={styles.textBold}>50포인트</span>를 받을 수 있어요!
        </div>
        <div className={styles.description}>
          받은 포인트로 다양한 <span className={styles.textBold}>기프트콘</span>을 살 수 있어요!
        </div>
        <div className={styles.imgWrapper}>
          <Image src={"/img/coin_img.png"} alt={"코인 이미지"} width={85} height={98} />
        </div>
        <div className={styles.confirmWrapper}>
          <div className={styles.currentPoint}>
            현재 <span className={styles.textBold}>{point}</span> <PointIcon />
          </div>
          <button className={styles.confirmBtn} onClick={onClick}>
            확인
          </button>
        </div>
      </div>
      <div className={styles.overlay} onClick={onClick} />
    </div>
  );
}
