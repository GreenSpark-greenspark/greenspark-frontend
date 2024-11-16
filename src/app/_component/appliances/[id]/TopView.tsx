import Image from "next/image";
import style from "./TopView.module.css";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import { getImage } from "@/utils/getImage";

interface TopViewProps {
  업체명칭: string;
  모델명: string;
  기자재명칭: string;
  효율등급: string;
}

const TopView = ({ 업체명칭, 기자재명칭, 모델명, 효율등급 }: TopViewProps) => {
  const displayName =
    기자재명칭 === "공기청정기 (~24.12.31)"
      ? "공기청정기"
      : 기자재명칭 === "전기냉난방기(~2018.10.01 이전)"
        ? "전기냉난방기"
        : 기자재명칭;

  return (
    <div className={style.TopWrapper}>
      <div>
        <div className={style.Circle} style={{ borderColor: getColorFromGrade(효율등급) }}>
          <Image
            src={getImage(기자재명칭)}
            alt={기자재명칭}
            width={45}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>
      </div>
      <div className={style.RightContainer}>
        <div className={style.TextWrapper}>
          <div className={style.TextContainer}>
            <span className={style.TextBold}>모델명</span>
            <span className={style.TextRegular}>{모델명}</span>
          </div>
          <div className={style.TextContainer}>
            <span className={style.TextBold}>업체명</span>
            <span className={style.TextRegular}>{업체명칭}</span>
          </div>
        </div>
        <div className={style.BtnContainer}>
          <div className={style.GrayBtn}>{displayName}</div>
          <div
            className={style.ColorBtn}
            style={{
              backgroundColor: getColorFromGrade(효율등급),
              color: 효율등급 === "3" ? "#929292" : "#fff"
            }}
          >
            {효율등급}등급
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopView;
