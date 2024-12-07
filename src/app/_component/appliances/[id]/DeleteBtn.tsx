import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import style from "./DeleteBtn.module.css";
import { useRouter } from "next/navigation";
import { apiWrapper } from "@/utils/api";

interface DeleteBtnProps {
  applianceId: string | string[];
}

const DeleteBtn = ({ applianceId }: DeleteBtnProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
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

  const openBottomSheet = () => {
    if (!showBottomSheet) {
      setShowBottomSheet(true);
      setIsTransitioning(false);
      setCurrentY(0);
    }
  };

  const closeBottomSheet = () => {
    setIsTransitioning(true);
    setCurrentY(1000);
    setTimeout(() => {
      setShowBottomSheet(false);
    }, 100);
  };

  const onDelete = async () => {
    try {
      const res = await apiWrapper(
        () =>
          axios.post(`${API_URL}/appliances/delete/${applianceId}`, {}, { withCredentials: true }),
        API_URL
      );

      if (res.status === 200) {
        closeBottomSheet();
        router.push("/list");
      } else {
        console.error("삭제 실패:", res.data);
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
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
      setIsTransitioning(true);
      setCurrentY(1000);
      setTimeout(closeBottomSheet, 100);
    } else {
      setIsTransitioning(true);
      setCurrentY(0);
    }
  };

  return (
    <div className={style.deleteBtnWrapper}>
      <button className={style.deleteBtn} onClick={openBottomSheet}>
        제품 삭제하기
      </button>

      {showBottomSheet && (
        <div className={style.bottomSheetOverlay} onClick={closeBottomSheet}>
          <div
            ref={bottomSheetRef}
            className={`${style.bottomSheet} ${showBottomSheet ? "" : "close"}`}
            style={{
              transform: `translateY(${currentY}px)`,
              transition: isTransitioning ? "transform 0.3s ease-out" : "none"
            }}
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={style.handleBar}></div>
            <p className={style.confirmText}>
              제품을
              <br />
              삭제하시겠어요?
            </p>
            <div className={style.actions}>
              <button className={style.confirmBtn} onClick={onDelete}>
                삭제하기
              </button>
              <button className={style.cancelBtn} onClick={closeBottomSheet}>
                나중에 하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
