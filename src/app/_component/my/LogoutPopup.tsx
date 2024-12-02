import React from "react";
import styles from "./LogoutPopup.module.css";
import Image from "next/image";
import PlugImg from "@/../public/img/logout_plug.png";

interface LogoutPopupProps {
  onClose: () => void;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.imageContainer}>
          <Image src={PlugImg} alt="플러그 이미지" width={100} style={{ marginBottom: "2rem" }} />
          <p style={{ fontSize: "1.6rem", fontWeight: "600" }}>정말 로그아웃 하시겠습니까?</p>
        </div>

        <div className={styles.btnContainer}>
          <button className={styles.closeBtn}>예</button>
          <button className={styles.confirmBtn} onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
