"use client";

import style from "./TopBarAppliance.module.css";
import IconArrow from "@/../public/icon/arrow_left.svg";
import IconAlarm from "@/../public/icon/history_icon.svg";
import { useRouter } from "next/navigation";

interface TopBarProps {
  text: string;
}

export default function TopBarApplianceToHome({ text }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => {
    router.push("/main");
  };
  const handleHistory = () => {
    router.push("/list/history");
  };

  return (
    <div className={style.TopBarWrapper}>
      <div className={style.ArrowWrapper} onClick={handleBack}>
        <IconArrow />
      </div>
      {text}
      <div className={style.AlarmWrapper} onClick={handleHistory}>
        <div className={style.IconWrapper}>
          <IconAlarm />
          <div className={style.IconText}> 
          히스토리
          </div>
        </div>
      </div>
    </div>
  );
}
