"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [point, setPoint] = useState<number>(0);
  const [name, setName] = useState<string>("ㅇㅇ");
  const openLogoutPopup = () => setIsPopupOpen(true);
  const closeLogoutPopup = () => setIsPopupOpen(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`${API_URL}/point`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          setPoint(response.data.data);
        } else {
          console.error("포인트 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("포인트 데이터 가져오기 실패:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/my`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          setName(response.data.data.name);
        } else {
          console.error("사용자 이름이 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("사용자 이름 가져오기 실패:", error);
      }
    };

    fetchPoints();
    fetchUserInfo();
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topContainer}>
          <Image src={ProfileImg} alt="프로필 이미지" width={77} />
          <p>{name} 님</p>
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
              <p className={styles.textTitle}>보유 포인트 </p>

              <div className={styles.alignDiv} style={{ marginLeft: "13rem" }}>
                <p className={styles.textPoint}>{point.toLocaleString()}</p>
                <IconPoint className={styles.iconPoint} />
              </div>
              <IconArrow className={styles.iconArrow} />
            </div>
            {/* <div className={styles.alignDiv}>
              <p className={styles.textPoint}>{point.toLocaleString()}</p>
              <IconPoint className={styles.iconPoint} />
            </div> */}
          </div>
          <div className={styles.bodyPoint}>
            <div className={styles.alignDiv}>
              <p className={styles.textTitle}>내 가전제품</p>
              {/* <IconArrow className={styles.iconArrow} /> */}
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
