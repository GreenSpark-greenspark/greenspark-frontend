import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./InputBottomSheet.module.css";

type InputBottomSheetProps = {
  onClose: () => void;
  onConfirmSave: () => void;
  onReEnter: () => void;
};

const InputBottomSheet: React.FC<InputBottomSheetProps> = ({
  onClose,
  onConfirmSave,
  onReEnter
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [name, setName] = useState<string>("사자");

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
    if (dragging && bottomSheetRef.current) {
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/my`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          setName(response.data.data.name);
        } else {
          console.error("사용자 이름이 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("사용자 이름 가져오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <>
      {showBottomSheet && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div
            ref={bottomSheetRef}
            className={styles.bottomSheet}
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
              <p className={styles.sheetTitle}>
                {name}님의 평균적인 전기요금과 차이가 커요! <br />
                정확히 입력했나요?
              </p>
              <div className={styles.btnContainer}>
                <button className={styles.confirmBtn} onClick={onConfirmSave}>
                  네, 그대로 입력할래요
                </button>
                <button className={styles.cancelBtn} onClick={onReEnter}>
                  아니요, 잘못 입력했어요
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InputBottomSheet;
