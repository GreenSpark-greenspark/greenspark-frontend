import React from "react";
import axios from "axios";
import styles from "./LogoutPopup.module.css";
import Image from "next/image";
import PlugImg from "@/../public/img/logout_plug.png";
import { useRouter } from "next/navigation";

interface LogoutPopupProps {
  onClose: () => void;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({ onClose }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        router.push("/");
        console.log(response);
      } else {
        console.error("로그아웃 실패:", response);
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        <div className={styles.imageContainer}>
          <Image src={PlugImg} alt="플러그 이미지" width={100} style={{ marginBottom: "2rem" }} />
          <p style={{ fontSize: "1.6rem", fontWeight: "600" }}>정말 로그아웃 하시겠습니까?</p>
        </div>

        <div className={styles.btnContainer}>
          <button className={styles.closeBtn} onClick={handleLogout}>
            예
          </button>
          <button className={styles.confirmBtn} onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
