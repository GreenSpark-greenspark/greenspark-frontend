import Image from "next/image";
import styles from "./AttendanceModal.module.css";
import PointIcon from "@/../public/icon/point_symbol.svg";

interface AttendanceModalProps {
  click: boolean;
  onClick: () => void;
}

export default function AttendanceModal({ click, onClick }: AttendanceModalProps) {
  if (click) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.title}>출석 50포인트 획득 🎉</div>
        <div className={styles.description}>
          매일 한 번씩 <span className={styles.textBold}>50포인트</span>를 받을 수 있어요!
        </div>
        <div className={styles.description}>
          받은 포인트로 다양한 <span className={styles.textBold}>기프트콘</span>을 살 수 있어요!
        </div>
        <div className={styles.imgWrapper}>
          <Image src={"/img/coin_img.png"} alt={"코인 이미지"} width={71} height={71} />
        </div>
        <div className={styles.confirmWrapper}>
          <div className={styles.currentPoint}>
            현재 <span className={styles.textBold}>1450</span> <PointIcon />
          </div>
          <button className={styles.confirmBtn} onClick={onClick}>
            확인
          </button>
        </div>
      </div>
      <div className={styles.overlay} onClick={onClick} />
    </div>
  );
}
