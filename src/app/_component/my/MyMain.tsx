"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileImg from "@/../public/img/my_profile.png";
import IconArrow from "@/../public/icon/arrow_left.svg";
import IconPoint from "@/../public/icon/point_icon.svg";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import LogoutPopup from "./LogoutPopup";
import styles from "./MyMain.module.css";

export default function MyMain() {
  const router = useRouter();
  const goToPoint = () => {
    router.push(`/my/point`);
  };
  const goToEdit = () => {
    router.push(`/my/info`);
  };

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const openLogoutPopup = () => setIsPopupOpen(true);
  const closeLogoutPopup = () => setIsPopupOpen(false);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <Image src={ProfileImg} alt="프로필 이미지" width={77} />
          <p>홍길동 님</p>
          <div className={styles.btnContainer}>
            <button className={styles.infoBtn} onClick={() => goToEdit()}>
              내 정보 수정
            </button>
            <button className={styles.logoutBtn} onClick={openLogoutPopup}>
              로그아웃
            </button>
          </div>
        </div>

        <div className={styles.bodyTopContainer}>
          <div className={styles.bodyPoint}>
            <div
              className={styles.alignDiv}
              style={{ cursor: "pointer" }}
              onClick={() => goToPoint()}
            >
              <p className={styles.textTitle}>보유 포인트</p>
              <IconArrow className={styles.iconArrow} />
            </div>
            <div className={styles.alignDiv}>
              <p className={styles.textPoint}>1,450</p>
              <IconPoint className={styles.iconPoint} />
            </div>
          </div>
          <div className={styles.bodyPoint}>
            <div className={styles.alignDiv}>
              <p className={styles.textTitle}>내 가전제품</p>
              <IconArrow className={styles.iconArrow} />
            </div>
          </div>
        </div>

        <div className={styles.gradeBoxContainer}>
          <div className={styles.gradeBox}>
            <p style={{ color: getColorFromGrade("1"), fontWeight: "600", fontSize: "2.5rem" }}>
              3
            </p>
            <p className={styles.gradeName}>1등급</p>
          </div>
          <div className={styles.gradeBox}>
            <p style={{ color: getColorFromGrade("2"), fontWeight: "600", fontSize: "2.5rem" }}>
              3
            </p>
            <p className={styles.gradeName}>2등급</p>
          </div>
          <div className={styles.gradeBox}>
            <p style={{ color: getColorFromGrade("3"), fontWeight: "600", fontSize: "2.5rem" }}>
              3
            </p>
            <p className={styles.gradeName}>3등급</p>
          </div>
          <div className={styles.gradeBox}>
            <p style={{ color: getColorFromGrade("4"), fontWeight: "600", fontSize: "2.5rem" }}>
              3
            </p>
            <p className={styles.gradeName}>4등급</p>
          </div>
          <div className={styles.gradeBox} style={{ border: "none" }}>
            <p style={{ color: getColorFromGrade("5"), fontWeight: "600", fontSize: "2.5rem" }}>
              3
            </p>
            <p className={styles.gradeName}>5등급</p>
          </div>
        </div>
      </div>

      {isPopupOpen && <LogoutPopup onClose={closeLogoutPopup} />}
    </>
  );
}
