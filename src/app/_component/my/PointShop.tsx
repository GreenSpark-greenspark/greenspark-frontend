"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./PointShop.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import MenuImg from "@/../public/img/gift_img.png";
import PurchasePopup from "./PurchasePopup";

interface MenuInfo {
  name: string;
  price: number;
}

export default function PointShop() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const menuInfo: MenuInfo = {
    name: "아이스 카페 아메리카노 T",
    price: 45000
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
        <div className={styles.menuContainer}>
          <Image src={MenuImg} alt="기프티콘 이미지" width={45} />
          <div className={styles.giftLeft}>
            <p className={styles.giftShopText}>스타벅스</p>
            <p className={styles.giftMenuText}>{menuInfo.name}</p>
            <div className={styles.pointContainer}>
              <p className={styles.giftMenuText}>{menuInfo.price.toLocaleString()}</p>
              <IconPoint className={styles.iconPointSmall} />
            </div>
          </div>
          <button className={styles.purchaseBtn} onClick={openPopup}>
            구매하기
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <PurchasePopup
          menuName={menuInfo.name}
          price={menuInfo.price}
          availablePoints={point}
          onClose={closePopup}
        />
      )}
    </>
  );
}
