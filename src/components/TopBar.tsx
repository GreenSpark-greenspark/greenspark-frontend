"use client";

import style from "./TopBar.module.css";
import IconArrow from "@/../public/icon/arrow_left.svg";
import { useRouter } from "next/navigation";

interface TopBarProps {
  text: string;
}

export default function TopBar({ text }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className={style.TopBarWrapper}>
      <div className={style.IconWrapper} onClick={handleBack}>
        <IconArrow />
      </div>
      {text}
    </div>
  );
}
