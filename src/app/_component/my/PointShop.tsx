"use client";
import React from "react";
import Image from "next/image";
import styles from "./PointShop.module.css";
import IconPoint from "@/../public/icon/point_icon.svg";
import MenuImg from "@/../public/img/gift_img.png";

export default function PointShop() {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <p className={styles.pointTitle}>사용 가능 포인트</p>
          <div className={styles.textPoint}>
            <p>1,450</p> <IconPoint className={styles.iconPoint} />
          </div>
        </div>
        <div className={styles.menuContainer}>
          <Image src={MenuImg} alt="기프티콘 이미지" width={45} />
          <div className={styles.giftLeft}>
            <p className={styles.giftShopText}>스타벅스</p>
            <p className={styles.giftMenuText}>아이스 카페 아메리카노 T</p>
            <div className={styles.pointContainer}>
              <p className={styles.giftMenuText}>45,000</p>
              <IconPoint className={styles.iconPointSmall} />
            </div>
          </div>
          <button className={styles.purchaseBtn}>구매하기</button>
        </div>
      </div>
    </>
  );
}
