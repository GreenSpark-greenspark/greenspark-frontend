"use client";
import axios from "axios";
import React, { useState } from "react";
import style from "./MemoBtn.module.css";
import { apiWrapper } from "@/utils/api";
import IconClose from "@/../public/icon/popup_close.svg";

interface MemoBtnProps {
  applianceId: string | string[];
}

const MemoBtn = ({ applianceId }: MemoBtnProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [memoContent, setMemoContent] = useState("");

  const onMemo = async () => {
    try {
      const res = await apiWrapper(
        () =>
          axios.post(
            `${API_URL}/appliances/${applianceId}/memo`,
            { content: memoContent },
            { withCredentials: true }
          ),
        API_URL
      );

      if (res.status === 200) {
        alert("메모가 성공적으로 등록되었습니다.");
        setShowPopup(false);
        setMemoContent("");
      } else {
        console.error("메모 실패:", res.data);
        alert("메모 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("메모 중 오류 발생:", error);
      alert("메모 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={style.memoBtnWrapper}>
      <button className={style.memoBtn} onClick={() => setShowPopup(true)}>
        메모 추가하기
      </button>

      {showPopup && (
        <div className={style.overlay} onClick={() => setShowPopup(false)}>
          <div className={style.popup} onClick={e => e.stopPropagation()}>
            <div className={style.cancelBtn} onClick={() => setShowPopup(false)}>
              <IconClose width={"16px"} height={"16px"} />
            </div>
            <div className={style.popupTitle}>메모를 입력해주세요!</div>
            <div className={style.popupSubTitle}>
              제품의 사용기한, 마지막 수리의 정보를 기록해보세요!
            </div>
            <textarea
              className={style.textarea}
              value={memoContent}
              onChange={e => setMemoContent(e.target.value)}
              placeholder="메모를 입력하세요."
            ></textarea>
            <div className={style.popupActions}>
              <button className={style.saveBtn} onClick={onMemo}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoBtn;
