import React, { useState } from "react";
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

  return (
    <div className={styles.overlay}>
      <div
        className={styles.bottomSheet}
        style={{ transform: `translateY(${currentY}px)` }} // 이동 거리 적용
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.bottomBar}></div>
        <div className={styles.sheetContent}>
          <p className={styles.sheetTitle}>
            지난 달과 차이가 커요! <br />
            정확히 입력했나요?
          </p>
          <div className={styles.btnContainer}>
            <button className={styles.confirmBtn} onClick={onConfirmSave}>
              이대로 입력하기
            </button>
            <button className={styles.reenterBtn} onClick={onReEnter}>
              다시 입력하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBottomSheet;
