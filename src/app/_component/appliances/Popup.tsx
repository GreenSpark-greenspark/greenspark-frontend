import React from "react";
import styles from "./Popup.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getImage } from "@/utils/getImage";

interface PopupProps {
  modelName: string;
  applianceType: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ modelName, applianceType, onClose }) => {
  const router = useRouter();

  const onGo = () => {
    onClose();
    router.push("/appliances");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.imageContainer}>
          <div className={styles.gradientBackground}></div>
          <Image
            src={getImage(applianceType)}
            alt={modelName}
            width={180}
            className={styles.modelImage}
          />
        </div>
        <div className={styles.modelText}>{modelName}</div>
        <div className={styles.modelText}>모델이 추가되었습니다!</div>
        <button onClick={onGo} className={styles.goToButton}>
          내 가전제품 바로가기
        </button>
      </div>
    </div>
  );
};

export default Popup;
