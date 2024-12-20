"use client";
import axios from "axios";
import React, { useState } from "react";
import style from "./MemoBtn.module.css";
import Toast from "@/components/Toast";
import { apiWrapper } from "@/utils/api";
import IconClose from "@/../public/icon/popup_close.svg";

interface MemoBtnProps {
  applianceId: string | string[];
  hasMemo: boolean; // 메모 세션 여부
  onMemoAdded?: (memoContent: string) => void; // 부모 컴포넌트에 메모 추가 알림
}

const MemoBtn = ({ applianceId, hasMemo, onMemoAdded }: MemoBtnProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MAX_CHAR_COUNT = 50;
  const [showPopup, setShowPopup] = useState(false);
  const [closing, setClosing] = useState(false);
  const [memoContent, setMemoContent] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        setToastMessage("메모가 성공적으로 등록되었습니다.");
        onMemoAdded?.(memoContent); // 부모 컴포넌트에 새 메모 알림
        closePopup();
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        console.error("메모 실패:", res.data);
        setToastMessage("메모 등록에 실패했습니다.");
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (error) {
      console.error("메모 중 오류 발생:", error);
      setToastMessage("메모 중 오류가 발생했습니다.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHAR_COUNT) {
      setMemoContent(e.target.value);
    }
  };

  const closePopup = () => {
    setClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setClosing(false);
    }, 300);
  };

  return (
    <div className={style.memoBtnWrapper}>
      {toastMessage && <Toast message={toastMessage} />}
      <button className={style.memoBtn} onClick={() => setShowPopup(true)}>
        {hasMemo ? "메모 수정하기" : "메모 추가하기"}
      </button>
      {showPopup && (
        <div className={style.overlay} onClick={closePopup}>
          <div
            className={`${style.popup} ${closing ? "hide" : ""}`}
            onClick={e => e.stopPropagation()}
          >
            <div className={style.cancelBtn} onClick={closePopup}>
              <IconClose width={"16px"} height={"16px"} />
            </div>
            <div className={style.popupTitle}>
              {hasMemo ? "메모를 수정해주세요!" : "메모를 입력해주세요!"}
            </div>
            <textarea
              className={style.textarea}
              value={memoContent}
              onChange={handleTextareaChange}
              placeholder="제품의 사용기한, 마지막 수리 날짜"
            ></textarea>
            <div className={style.charCount}>
              {memoContent.length}/{MAX_CHAR_COUNT}
            </div>
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
