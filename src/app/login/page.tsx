import React from "react";
import IconGoogle from "@/../public/icon/login_google.svg";
import styles from "./LoginPage.module.css";

export default function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <p className={styles.loginMent}>지금 바로 시작해보세요!</p>
        <button type="button" className={styles.loginBtn}>
          <IconGoogle className={styles.googleIcon} />
          <p className={styles.googleMent}>Google 계정으로 로그인</p>
        </button>
      </div>
    </>
  );
}
