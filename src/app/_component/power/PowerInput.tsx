import React from "react";
import Link from "next/link";
import styles from "./power.common.module.css";
import Box from "@/components/Box";

export default function NowPower() {
  return (
    <>
      <div className={styles.wrap}>
        <Box>
          <div className={styles.powerinput}>
            <p className={styles.text_normal}>내 파워를 입력해주세요!</p>
            <Link href="/powerinput" passHref>
              <button className={styles.btn}>입력하러 가기</button>
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
}
