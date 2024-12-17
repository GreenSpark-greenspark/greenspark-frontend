"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./PurchasePopup.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import EmailPopup from "./EmailPopup";
import NoPurchasePopup from "./NoPurchasePopup";

interface PurchasePopupProps {
  imgurl: string;
  menuName: string;
  shop: string;
  price: number;
  availablePoints: number;
  onClose: () => void;
}

type PopupType = "main" | "email" | "noPoints";

const PurchasePopup: React.FC<PurchasePopupProps> = ({
  imgurl,
  menuName,
  shop,
  price,
  availablePoints,
  onClose
}) => {
  const [currentPopup, setCurrentPopup] = useState<PopupType>("main");

  // 바텀시트
  const [startY, setStartY] = useState<number>(0);
  const [currentY, setCurrentY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY; // 이동 거리 계산
    if (deltaY > 0) setCurrentY(deltaY); //아래로 이동 (양수 값만 적용)
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentY > 100) {
      // 100px 이상 이동 시 바텀시트 닫기

      onClose();
    } else {
      setCurrentY(0);
    }
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handleBottomSheetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 포인트 업데이트
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const updatePoint = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/point/update`,
        {
          pointAmount: -price,
          event: "기프티콘 구매"
        },
        {
          withCredentials: true
        }
      );
      console.log("포인트 업데이트 성공:", response.data);
      return response.data.success;
    } catch (error) {
      console.error("포인트 업데이트 실패:", error);
      return false;
    }
  };

  // 구매 버튼 클릭
  const handlePurchaseClick = async () => {
    if (availablePoints >= price) {
      const isSuccess = await updatePoint();
      if (isSuccess) {
        setCurrentPopup("email");
      } else {
        setCurrentPopup("noPoints");
      }
    } else {
      setCurrentPopup("noPoints");
    }
  };

  const closeAllPopups = () => {
    setCurrentPopup("main");
    onClose();
  };

  return (
    <>
      {currentPopup === "main" && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div
            className={styles.bottomSheet}
            style={{ transform: `translateY(${currentY}px)` }} // 이동 거리 적용
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleBottomSheetClick}
          >
            <div className={styles.bottomBar}></div>
            <div className={styles.sheetContent}>
              <p className={styles.sheetTitle}>제품을 구매하시겠어요?</p>
              <h1>{price.toLocaleString()} 포인트가 차감될 예정이에요!</h1>
              <div className={styles.pointContainer}>
                <p className={styles.availablePoint}>보유 포인트</p>
                <p className={styles.giftMenuText}>{availablePoints.toLocaleString()}</p>
                <IconPoint className={styles.iconPointSmall} />
              </div>

              <div className={styles.btnContainer}>
                <button className={styles.confirmBtn} onClick={handlePurchaseClick}>
                  구매할래요
                </button>
                <button className={styles.cancelBtn} onClick={onClose}>
                  나중에 할래요
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPopup === "email" && (
        <EmailPopup imgurl={imgurl} menuName={menuName} shop={shop} onClose={closeAllPopups} />
      )}

      {currentPopup === "noPoints" && (
        <NoPurchasePopup availablePoints={availablePoints} onClose={closeAllPopups} />
      )}
    </>
  );
};

export default PurchasePopup;
