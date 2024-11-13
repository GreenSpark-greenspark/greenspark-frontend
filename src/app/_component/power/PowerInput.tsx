import React from "react";
import { useRouter } from "next/navigation";
import styles from "./power.common.module.css";

export default function NowPower() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/power/input");
  };

  return (
    <div className={styles.btnWrap}>
      <button className={styles.powerBtn} onClick={handleNavigate}>
        파워 입력하기
      </button>
    </div>
  );
}
