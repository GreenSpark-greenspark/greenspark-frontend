import React from "react";
import styles from "./Toast.module.css";
import InfoIcon from "@/../public/icon/toast_info_icon.svg";

interface ToastProps {
  message: string;
  icon?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ message, icon = <InfoIcon /> }) => {
  return (
    <div className={styles.toast}>
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
