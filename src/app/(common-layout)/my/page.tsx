import React from "react";
import Image from "next/image";
import Image404 from "@/../public/404/404.png";
import ErrorImg from "@/../public/404/error.png";
import IconWarning from "@/../public/404/warningIcon.svg";
import style from "./page.module.css";

const Page = () => {
  return (
    <div className={style.pageWrap}>
      <div className={style.boxContainer}>
        <div className={style.imgContainer}>
          <IconWarning width={80} height={80} />
          <Image src={Image404} alt="404 Error" width={211} priority />
          <Image src={ErrorImg} alt="Error Image" width={122} style={{ marginTop: 10 }} priority />
        </div>
        <div className={style.description}>공사중입니다!</div>
        <div className={style.description}>2차 발표 때 만나요!</div>
      </div>
    </div>
  );
};

export default Page;
