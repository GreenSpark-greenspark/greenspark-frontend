"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmailPopup.module.css";
import Image from "next/image";
import IconPoint from "@/../public/icon/point_icon.svg";

interface EmailPopupProps {
  imgurl: string;
  menuName: string;
  shop: string;
  onClose: () => void;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ imgurl, menuName, shop, onClose }) => {
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
        <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
          <div className={styles.imageContainer}>
            <Image
              src={imgurl}
              alt="기프티콘 이미지"
              width={150}
              height={150}
              style={{ marginBottom: "1rem" }}
            />
            <h2>{shop}</h2>
            <h1>{menuName}</h1>

            <p style={{ fontSize: "1.4rem", fontWeight: "500", color: "#5E5E5E" }}>
              등록하신 <span style={{ color: "#19E407" }}>이메일</span>로
              <br />
              기프티콘을 전송했어요!
            </p>
          </div>
          <div className={styles.pointMent}>
            <p>남은 포인트</p>
            <div className={styles.pointContainer}>
              <p>{point.toLocaleString()}</p>
              <IconPoint className={styles.iconPointSmall} />
            </div>
          </div>

          <button className={styles.submitBtn} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
