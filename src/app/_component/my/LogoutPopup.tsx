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
        <div className={styles.popupBox}>
          <Image src={PlugImg} alt="플러그 이미지" width={78} style={{ marginBottom: "2rem" }} />
          <p style={{ fontSize: "1.6rem", fontWeight: "600" }}>정말 로그아웃 하시겠어요?</p>
          <div className={styles.btnContainer}>
            <button className={styles.closeBtn} onClick={handleLogout}>
              로그아웃 하기
            </button>
            <button className={styles.confirmBtn} onClick={onClose}>
              계속 이용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
