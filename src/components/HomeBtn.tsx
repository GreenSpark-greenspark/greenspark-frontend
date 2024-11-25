"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./HomeBtn.module.css";

const HomeBtn = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/main");
  };

  return (
    <button className={styles.homeButton} onClick={goToHome}>
      홈으로 가기
    </button>
  );
};

export default HomeBtn;
