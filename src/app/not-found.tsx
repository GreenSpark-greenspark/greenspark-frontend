import React from "react";
import Image from "next/image";
import Image404 from "@/../public/404/404.png";
import ErrorImg from "@/../public/404/error.png";
import IconWarning from "@/../public/404/warningIcon.svg";
import style from "./not-found.module.css";
import HomeBtn from "@/components/HomeBtn";

const NotFound = () => {
  return (
    <div className={style.pageWrap}>
      <div className={style.boxContainer}>
        <div className={style.imgContainer}>
          <IconWarning width={80} height={80} />
          <Image src={Image404} alt="404 Error" width={211} priority />
          <Image src={ErrorImg} alt="Error Image" width={122} style={{ marginTop: 10 }} priority />
        </div>
        <div className={style.description}>존재하지 않는 페이지입니다.</div>
        <HomeBtn />
      </div>
    </div>
  );
};

export default NotFound;
