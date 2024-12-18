"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoIcon from "@/../public/icon/toast_info_icon.svg";
import styles from "./expectPreCost.module.css";
import ExpectPreChart from "./ExpectPreChart";
import Lottie from "react-lottie";
import { defaultOptions } from "@/lib/lottieOption";

export default function ExpectPreCost() {
  const [name, setName] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/my`, {
        withCredentials: true
      });
      if (response.data && response.data.success) {
        setName(response.data.data.name || "사자");
        setFamily(response.data.data.householdMembers || "1");
        setDate(response.data.data.electricityDueDate || "");
      } else {
        console.error("사용자 정보가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (name === null || family === null || date === null) {
    return (
      <div
        style={{
          width: "375px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return (
    <>
      <div style={{ paddingBottom: "10rem" }}>
        <div className={styles.expectTop}>
          <div className={styles.topLeft}>
            <p className={styles.topTitle}>{name}님의 다음 전기요금은..</p>
            <div className={styles.infoContianer}>
              <InfoIcon className={styles.infoIcon} />
              <p className={styles.infoText}>
                AI 기반의 예측이므로, 정확하지 않을 수 있습니다. <br />
                더욱 정확한 예측을 원한다면 파워 빈칸을 채워주세요.
              </p>
            </div>
          </div>
          <div className={styles.topRight}>
            <div className={styles.infoDate}></div>
            <p className={styles.infoText}>납부일 {date}일</p>
          </div>
        </div>
        <ExpectPreChart member={family} />
      </div>
    </>
  );
}
