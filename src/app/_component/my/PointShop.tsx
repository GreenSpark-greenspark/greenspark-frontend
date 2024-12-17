"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Image from "next/image";
import styles from "./PointShop.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import { gift } from "@/mock/gift";

export default function PointShop() {
  const [point, setPoint] = useState<number>(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

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

  const handlePurchase = (id: number) => {
    router.push(`/shop/${id}`);
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <p className={styles.pointTitle}>사용 가능 포인트</p>
          <div className={styles.textPoint}>
            <p>{point.toLocaleString()}</p>
            <IconPoint className={styles.iconPoint} />
          </div>
        </div>

        <div className={styles.menuContainer}>
          {gift.map(item => (
            <div key={item.id} className={styles.menuItem} onClick={() => handlePurchase(item.id)}>
              <div className={styles.leftContainer}>
                <Image
                  src={item.url}
                  alt={item.메뉴이름}
                  width={140}
                  height={140}
                  style={{ borderRadius: "10px" }}
                />
                <div className={styles.giftLeft}>
                  <p className={styles.giftShopText}>{item.판매처}</p>
                  <p className={styles.giftMenuText}>{item.메뉴이름}</p>
                  <div className={styles.pointContainer}>
                    <p className={styles.giftMenuText}>
                      {parseInt(item.가격, 10).toLocaleString()}
                    </p>
                    <IconPoint className={styles.iconPointSmall} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
