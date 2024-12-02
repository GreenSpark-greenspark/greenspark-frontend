import React from "react";
import styles from "./NoPurchasePopup.module.css";

import IconPoint from "@/../public/icon/point_icon.svg";

type NoPurchasePopupProps = {
  onClose: () => void;
  availablePoints: number;
};

const NoPurchasePopup: React.FC<NoPurchasePopupProps> = ({ onClose, availablePoints }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.popup}>
          <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
            <div className={styles.topContainer}>
              <h1>보유하신 포인트가 부족합니다 :(</h1>
              <p>포인트를 더 많이 모아 구매해보세요!</p>
            </div>
            <div className={styles.pointMent}>
              <p>현재 포인트</p>
              <div className={styles.pointContainer}>
                <p className={styles.giftMenuText}>{availablePoints.toLocaleString()}</p>
                <IconPoint className={styles.iconPointSmall} />
              </div>
            </div>

            <button className={styles.submitBtn} onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPurchasePopup;