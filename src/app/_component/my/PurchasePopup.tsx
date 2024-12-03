import React, { useState } from "react";
import Image from "next/image";
import styles from "./PurchasePopup.module.css";
import MenuImg from "@/../public/img/gift_img.png";
import IconPoint from "@/../public/icon/point_icon.svg";
import EmailPopup from "./EmailPopup";
import NoPurchasePopup from "./NoPurchasePopup";

interface PurchasePopupProps {
  menuName: string;
  price: number;
  availablePoints: number;
  onClose: () => void;
}

type PopupType = "main" | "email" | "noPoints";

const PurchasePopup: React.FC<PurchasePopupProps> = ({
  menuName,
  price,
  availablePoints,
  onClose
}) => {
  const [currentPopup, setCurrentPopup] = useState<PopupType>("main"); // 다음 팝업으로 넘어가면 하위 팝업은 닫음

  const handlePurchaseClick = () => {
    if (availablePoints >= price) {
      setCurrentPopup("email");
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
              <Image src={MenuImg} alt="기프티콘 이미지" width={55} />
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
        <EmailPopup availablePoints={availablePoints} onClose={closeAllPopups} />
      )}

      {currentPopup === "noPoints" && (
        <NoPurchasePopup availablePoints={availablePoints} onClose={closeAllPopups} />
      )}
    </>
  );
};

export default PurchasePopup;
