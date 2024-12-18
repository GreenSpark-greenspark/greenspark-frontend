"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./LikelionBottomSheet.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";

interface LikelionBottomSheetProps {
  imgurl: string;
  menuName: string;
  shop: string;
  price: number;
  availablePoints: number;
  onClose: () => void;
}

const LikelionBottomSheet: React.FC<LikelionBottomSheetProps> = ({
  price,
  availablePoints,
  onClose
}) => {
  // 바텀시트
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [point, setPoint] = useState<number>(0);

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

  useEffect(() => {
    // const updatePoint = async () => {
    //   try {
    //     const response = await axios.post(
    //       `${API_URL}/point/update`,
    //       {
    //         pointAmount: -price,
    //         event: "기프티콘 구매"
    //       },
    //       {
    //         withCredentials: true
    //       }
    //     );
    //     console.log("포인트 업데이트 성공:", response.data);
    //     return response.data.success;
    //   } catch (error) {
    //     console.error("포인트 업데이트 실패:", error);
    //     return false;
    //   }
    // };

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
    // updatePoint();
    fetchPoints();
  }, []);

  return (
    <>
      {showBottomSheet && (
        <>
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
                <p className={styles.sheetTitle}>멋사 졸업을 축하합니다!🦁</p>
                <h1>그동안 수고 많으셨습니다!</h1>
                <div className={styles.pointContainer}>
                  <p className={styles.availablePoint}>남은 포인트</p>
                  <p className={styles.giftMenuText}>{point.toLocaleString()}</p>
                  <IconPoint className={styles.iconPointSmall} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LikelionBottomSheet;
