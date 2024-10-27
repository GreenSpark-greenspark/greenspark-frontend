import React from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import IconComment from "../../../../public/icon/power_comment.svg";

export default function PreCharge() {
  return (
    <>
      <p className={styles.title}>저번달 요금</p>
      <div className={styles.wrap}>
        <Box>
          <p className={styles.text_normal}>
            저번달<span className={styles.text_bold}> (00년 00월) </span>의 전기 요금
          </p>
          <p className={styles.cost}>
            <span className={styles.costGreen}>8,710</span> 원
          </p>
          <div className={styles.compareContainer}>
            <div className={styles.comment}>
              <IconComment className={styles.iconComment} />
              <p className={styles.commentText}>
                전월에 비해 <span className={styles.commentRed}>5,488원</span> 증가했어요!
              </p>
            </div>
            <p className={styles.tipMent}>
              조금 더 전기를 아껴보는 건 어떨까요? <br />
              에너지 백과를 통해 다양한 팁을 살펴보아요!{" "}
            </p>
          </div>
        </Box>
      </div>
    </>
  );
}
