import Image from "next/image";
import style from "./History.module.css";
import airConditioner from "@/../public/img/appliances/airConditioner.png";

export default function History() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className={style.pageWrapper}>
      <div className={style.hr}></div>

      <div className={style.section}>
        <div className={style.imgWrapper}>
          <Image src={airConditioner} alt="에어컨" width={50} />
        </div>
        <div className={style.textWrapper}>
          <div className={style.title}>에어컨 효율등급 변경</div>
          <div className={style.text}>
            에어컨 효율등급이
            <br />
            <span className={style.textBold}>1등급</span>에서
            <span className={style.textBold}> 2등급</span>으로 변경되었습니다.
          </div>
        </div>
        <div className={style.dateText}>2024년 9월</div>
      </div>
      <div className={style.hr}></div>
    </div>
  );
}
