import React from "react";
import styles from "../power/power.common.module.css";
import Box from "@/components/Box";
import Iconcoin from "@/../public/icon/coin.svg";
export default function AttendanceCoin() {
  return (
    <>
      <div className={styles.wrap}>
        <Box>
          <div className={styles.coinContainer}>
            <p className={styles.text_normal}>하루에 한 번씩 코인을 획득하세요!</p>
            <div className={styles.coin}>
              <Iconcoin className={styles.coinIcon} />
              <p className={styles.text_normal}>50</p>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
