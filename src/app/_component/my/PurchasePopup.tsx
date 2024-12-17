"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (showBottomSheet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showBottomSheet]);

  const closeBottomSheet = () => {
    setIsTransitioning(true);
    setCurrentY(1000);
    setTimeout(() => {
      setIsTransitioning(false);
      setShowBottomSheet(false);
      onClose();
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsTransitioning(false);
    setDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragging) {
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY > 0) {
        setCurrentY(deltaY);
      }
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);

    if (currentY > 100) {
      closeBottomSheet();
    } else {
      setIsTransitioning(true);
      setCurrentY(0);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleOverlayClick = () => {
    closeBottomSheet();
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
      {showBottomSheet && (
        <>
          {currentPopup === "main" && (
            <div className={styles.overlay} onClick={handleOverlayClick}>
              <div
                className={styles.bottomSheet}
                ref={bottomSheetRef}
                style={{
                  transform: `translateY(${currentY}px)`,
                  transition: isTransitioning ? "transform 0.3s ease-out" : "none"
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleBottomSheetClick}
              >
                <div className={styles.bottomBar}></div>
                <div className={styles.sheetContent}>
                  <p className={styles.sheetTitle}>제품을 구매하시겠어요?</p>
                  <h1>{price.toLocaleString("ko-KR")} 포인트가 차감될 예정이에요!</h1>
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
      )}
    </>
  );
};

export default PurchasePopup;
