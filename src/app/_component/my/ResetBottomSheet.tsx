import React, { useState } from "react";
import styles from "./ResetBottomSheet.module.css";

type ResetBottomSheetProps = {
  onClose: () => void;
};

const ResetBottomSheet: React.FC<ResetBottomSheetProps> = ({ onClose }) => {
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
  return (
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
          <div className={styles.sheetTitle}>가족 구성원 변동이 있었나요?</div>
          <div className={styles.recommend}>
            <h1>변동 시 전기 요금 차이가 있어</h1>
            <h2>예상 요금이 정확하지 않을 수 있어요!</h2>
            <h3>변동 시 기존 데이터를 초기화하는 것을 추천합니다.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetBottomSheet;
