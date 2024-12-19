"use client";
import React, { useEffect, useState } from "react";
import IconLogo from "@/../public/icon/login_logo.svg";
import TextLogo from "@/../public/icon/login_textLogo.svg";

import styles from "./LoginPage.module.css";
import LoginBtn from "@/app/_component/login/LoginBtn";

export default function Login() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setIsLogoAnimating(true);
    }, 500);

    const loginTimer = setTimeout(() => {
      setIsLoginVisible(true);
    }, 1100);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(loginTimer);
    };
  }, []);

  return (
    <>
      <div className={styles.loginPageContainer}>
        <div className={`${styles.logoContainer} ${isLogoAnimating ? styles.logoAnimate : ""}`}>
          <div className={styles.logoTopContainer}>
            <IconLogo className={styles.iconLogo} />
            <p className={styles.logoMent}>
              전기요금 절약으로 <br />
              지속가능한 도약을 만들어내는,
            </p>
          </div>
          <TextLogo className={styles.textLogo} />
        </div>

        <div className={`${styles.loginContainer} ${isLoginVisible ? styles.loginFadeIn : ""}`}>
          <p className={styles.loginMent}>지금 바로 시작해보세요!</p>
          <LoginBtn />
        </div>
      </div>
    </>
  );
}
