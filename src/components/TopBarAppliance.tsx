"use client";

import style from "./TopBarAppliance.module.css";
import IconArrow from "@/../public/icon/arrow_left.svg";
import IconAlarm from "@/../public/icon/alarm_off.svg";
import { useRouter } from "next/navigation";

interface TopBarProps {
  text: string;
}

export default function TopBarAppliance({ text }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
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
        <IconAlarm />
      </div>
    </div>
  );
}
