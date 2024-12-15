import React, { useState } from "react";
import styles from "./AttendanceCoin.module.css";
import Box from "@/components/Box";
import Iconcoin from "@/../public/icon/coin.svg";
import AttendanceModal from "./attendanceModal.tsx/AttendanceModal";

export default function AttendanceCoin() {
  const [click, setClick] = useState(false);

  const onClick = () => {
    setClick(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.coinWrap}>
        <button className={styles.btn} onClick={onClick}>
          <Box>
            <div className={styles.coinContainer}>
              <p className={styles.text_normal}>하루에 한 번씩 포인트를 획득하세요!</p>
              <div className={styles.coin}>
                <Iconcoin className={styles.coinIcon} />
                <p className={styles.text_normal}>50</p>
              </div>
            </div>
          </Box>
        </button>
      </div>
      {click && <AttendanceModal click={click} onClick={onClick} />}
    </>
  );
}
