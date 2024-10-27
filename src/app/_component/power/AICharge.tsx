import React from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";
export default function AICharge() {
  return (
    <>
      <p className={styles.title}>AI가 분석하는 이번달 예상요금</p>
      <div className={styles.wrap}>
        <Box>
          <p className={styles.text_normal}>
            이번달<span className={styles.text_bold}> (00년 00월) </span>얘상 요금은..
          </p>
          <p className={styles.cost}>
            <span className={styles.costGreen}>9,492</span> 원
          </p>
          <div className={styles.comment}>
            <IconComment className={styles.iconComment} />
            <p className={styles.commentText}>
              전월에 비해 <span className={styles.commentBlue}>5,488원</span> 감소할 것으로
              예상돼요!
            </p>
          </div>
        </Box>
      </div>
    </>
  );
}
