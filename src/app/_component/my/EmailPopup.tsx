"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmailPopup.module.css";
import Image from "next/image";
import IconPoint from "@/../public/icon/point_icon.svg";
import MenuImg from "@/../public/img/gift_img.png";

interface EmailPopupProps {
  onClose: () => void;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ onClose }) => {
  const [point, setPoint] = useState<number>(0);

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

    fetchPoints();
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.imageContainer}>
          <Image src={MenuImg} alt="기프티콘 이미지" width={85} style={{ marginBottom: "1rem" }} />
          <h1>메뉴이름</h1>

          <p style={{ fontSize: "1.6rem", fontWeight: "500" }}>
            등록하신 이메일로
            <br />
            기프티콘을 전송했어요!
          </p>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.pointMent}>
            <p>현재 포인트</p>
            <div className={styles.pointContainer}>
              <p className={styles.giftMenuText}>{point.toLocaleString()}</p>
              <IconPoint className={styles.iconPointSmall} />
            </div>
          </div>
          <button className={styles.goToButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
