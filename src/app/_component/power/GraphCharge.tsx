"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./power.common.module.css";
import graphStyles from "./graph.common.module.css";

import BillGraph from "./BillGraph";
import UsageGraph from "./UsageGraph";

import IconInfo from "@/../public/icon/toast_info_icon.svg";
export default function GraphCharge() {
  const [activeButton, setActiveButton] = useState<string>("bill");
  const [name, setName] = useState<string>("사자");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
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

    fetchUserInfo();
  }, []);
  return (
    <>
      <p className={styles.title}>{name}님의 파워 분석 리포트</p>
      <div className={styles.wrap}>
        <div className={graphStyles.graphBox}>
          <div className={graphStyles.topContainer}>
            <div className={graphStyles.btnContainer}>
              <div
                className={`${graphStyles.graphBtn} ${activeButton === "bill" ? graphStyles.btnActive : ""}`}
                onClick={() => handleButtonClick("bill")}
              >
                <p>전기요금</p>
              </div>

              <div
                className={`${graphStyles.graphBtn} ${activeButton === "usage" ? graphStyles.btnActive : ""}`}
                onClick={() => handleButtonClick("usage")}
              >
                <p>전력사용량</p>
              </div>
            </div>
            <div className={graphStyles.infoContainer}>
              <IconInfo style={{ width: "1.3rem", height: "1.3rem", fill: "#929292" }} />
              <p>포인트를 터치하면 정확한 요금을 확인할 수 있어요!</p>
            </div>
            <div className={graphStyles.yearContainer}>
              <div className={graphStyles.yearUnit}>
                <div className={graphStyles.greenCircle} />
                <p>올해</p>
              </div>
              <div className={graphStyles.yearUnit}>
                <div className={graphStyles.greyCircle} />
                <p>1년 전</p>
              </div>
            </div>
          </div>
          {activeButton === "bill" && <BillGraph />}
          {activeButton === "usage" && <UsageGraph />}
        </div>
      </div>
    </>
  );
}
