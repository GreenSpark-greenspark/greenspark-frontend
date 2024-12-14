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
        <div className={styles.overlay} onClick={onClose}>
          <div className={styles.popup} onClick={e => e.stopPropagation()}>
            <div className={styles.popupBox}>
              <Image src={imgurl} alt={menuName} width={45} height={45} />
              <p className={styles.giftMenuText}>{menuName}</p>
              <div className={styles.pointContainer}>
                <p className={styles.giftMenuText}>{price.toLocaleString()}</p>
                <IconPoint className={styles.iconPointSmall} />
              </div>
              <p className={styles.buyMent}>구매하시겠습니까?</p>
              <div className={styles.btnContainer}>
                <button className={styles.closeBtn} onClick={onClose}>
                  취소하기
                </button>
                <button className={styles.confirmBtn} onClick={handlePurchaseClick}>
                  구매하기
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
