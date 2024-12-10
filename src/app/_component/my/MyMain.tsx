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

  const goToAppliance = () => {
    router.push(`/list`);
  };

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
  const [name, setName] = useState<string>("사자");
  const [gradeCounts, setGradeCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const openLogoutPopup = () => setIsPopupOpen(true);
  const closeLogoutPopup = () => setIsPopupOpen(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 보유 포인트
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
    // 사용자 이름
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
    // 가전제품
    const fetchApplianceInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/appliances`, {
          withCredentials: true
        });
        if (response.data && response.data.success) {
          const appliances = response.data.data;

          const counts: { 1: number; 2: number; 3: number; 4: number; 5: number } = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
          };
          // 등급 카운트하기
          appliances.forEach((appliance: { grade: string }) => {
            const grade = parseInt(appliance.grade, 10);
            if (grade >= 1 && grade <= 5) {
              counts[grade as 1 | 2 | 3 | 4 | 5]++;
            }
          });

          setGradeCounts(counts);
        } else {
          console.error("가전제품 데이터가 유효하지 않습니다.");
        }
      } catch (error) {
        console.error("가전제품 데이터 가져오기 실패:", error);
      }
    };

    fetchPoints();
    fetchUserInfo();
    fetchApplianceInfo();
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
            <div className={styles.alignDiv} onClick={() => goToPoint()}>
              <p className={styles.textTitle}>보유 포인트 </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.pointContainer}>
                  <p className={styles.textPoint}>{point.toLocaleString()}</p>
                  <IconPoint className={styles.iconPoint} />
                </div>
                <IconArrow className={styles.iconArrow} />
              </div>
            </div>
          </div>
          <div className={styles.bodyPoint}>
            <div className={styles.alignDiv} onClick={() => goToAppliance()}>
              <p className={styles.textTitle}>내 가전제품</p>
              <IconArrow className={styles.iconArrow} />
            </div>
          </div>
        </div>

        <div className={styles.gradeBoxContainer}>
          {Object.entries(gradeCounts).map(([grade, count]) => (
            <div
              key={grade}
              className={styles.gradeBox}
              style={{ border: grade === "5" ? "none" : undefined }}
            >
              <p
                style={{
                  // color: getColorFromGrade(grade),
                  color: count === 0 ? "#929292" : getColorFromGrade(grade),
                  fontWeight: "600",
                  fontSize: "2.5rem"
                }}
              >
                {count}
              </p>
              <p className={styles.gradeName}>{grade}등급</p>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && <LogoutPopup onClose={closeLogoutPopup} />}
    </>
  );
}
