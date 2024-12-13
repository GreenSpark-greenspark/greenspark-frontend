"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./PointShop.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import PurchasePopup from "./PurchasePopup";
import { gift } from "@/mock/gift";

export default function PointShop() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [point, setPoint] = useState<number>(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const openPopup = (gift: any) => {
    setSelectedGift(gift);
    setIsPopupOpen(true);
  };

  const closePopup = async () => {
    setIsPopupOpen(false);
    await fetchPoints();
  };

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

  useEffect(() => {
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
        {gift.map(item => (
          <div key={item.메뉴이름} className={styles.menuContainer}>
            <div className={styles.leftContainer}>
              <Image src={item.url} alt={item.메뉴이름} width={45} height={45} />
              <div className={styles.giftLeft}>
                <p className={styles.giftShopText}>{item.판매처}</p>
                <p className={styles.giftMenuText}>{item.메뉴이름}</p>
                <div className={styles.pointContainer}>
                  <p className={styles.giftMenuText}>{parseInt(item.가격, 10).toLocaleString()}</p>
                  <IconPoint className={styles.iconPointSmall} />
                </div>
              </div>
            </div>

            <button className={styles.purchaseBtn} onClick={() => openPopup(item)}>
              구매하기
            </button>
          </div>
        ))}
      </div>

      {isPopupOpen && selectedGift && (
        <PurchasePopup
          imgurl={selectedGift.url}
          menuName={selectedGift.메뉴이름}
          shop={selectedGift.판매처}
          price={parseInt(selectedGift.가격, 10)}
          availablePoints={point}
          onClose={closePopup}
        />
      )}
    </>
  );
}
