"use client";

import styles from "./LoginBtn.module.css";
import IconGoogle from "@/../public/icon/login_google.svg";

export default function LoginBtn() {
  return (
    <div>
      <button type="button" className={styles.loginBtn}>
        <IconGoogle className={styles.googleIcon} />
        <p className={styles.googleMent}>Google 계정으로 로그인</p>
      </button>
    </div>
  );
}
