"use client";
import axios from "axios";
import React, { useState } from "react";
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

  const openBottomSheet = () => {
    setShowBottomSheet(true); // 바텀시트 열기
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false); // 바텀시트 닫기
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

  return (
    <div className={style.deleteBtnWrapper}>
      <button className={style.deleteBtn} onClick={openBottomSheet}>
        제품 삭제하기
      </button>

      {showBottomSheet && (
        <div className={style.bottomSheetOverlay} onClick={closeBottomSheet}>
          <div className={style.bottomSheet} onClick={e => e.stopPropagation()}>
            <div className={style.handleBar}></div>
            <p className={style.confirmText}>
              제품을
              <br />
              삭제하시겠어요?
            </p>
            <div className={style.actions}>
              <button className={style.confirmBtn} onClick={onDelete}>
                진행하기
              </button>
              <button className={style.cancelBtn} onClick={closeBottomSheet}>
                취소하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
