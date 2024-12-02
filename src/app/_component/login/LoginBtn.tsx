"use client";

import styles from "./LoginBtn.module.css";
import IconGoogle from "@/../public/icon/login_google.svg";

export default function LoginBtn() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const onGoogleLogin = async () => {
    window.location.href = `${API_URL}/login`;
  };
  return (
    <div>
      <button type="button" className={styles.loginBtn} onClick={onGoogleLogin}>
        <IconGoogle className={styles.googleIcon} />
        <p className={styles.googleMent}>Google 계정으로 로그인</p>
      </button>
    </div>
  );
}
