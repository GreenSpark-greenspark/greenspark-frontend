import React from "react";
import styles from "./EmailPopup.module.css";
import Image from "next/image";
import IconPoint from "@/../public/icon/point_icon.svg";
import MenuImg from "@/../public/img/gift_img.png";

interface EmailPopupProps {
  onClose: () => void;
  availablePoints: number;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ onClose, availablePoints }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.imageContainer}>
          <Image src={MenuImg} alt="기프티콘 이미지" width={85} style={{ marginBottom: "1rem" }} />
          <h1>메뉴이름</h1>

          <p style={{ fontSize: "1.6rem", fontWeight: "500" }}>
            등록하신 이메일로
            <br />
            기프티콘을 전송했어요!
          </p>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.pointMent}>
            <p>현재 포인트</p>
            <div className={styles.pointContainer}>
              <p className={styles.giftMenuText}>{availablePoints.toLocaleString()}</p>
              <IconPoint className={styles.iconPointSmall} />
            </div>
          </div>
          <button className={styles.goToButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
