import Image from "next/image";
import style from "./TopView.module.css";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import { getImage } from "@/utils/getImage";
import { getDisplayName } from "@/utils/getDisplayName";

interface TopViewProps {
  업체명칭: string;
  모델명: string;
  기자재명칭: string;
  효율등급: string;
}

const TopView = ({ 업체명칭, 기자재명칭, 모델명, 효율등급 }: TopViewProps) => {
  const displayName = getDisplayName(기자재명칭);

  return (
    <div className={style.TopWrapper}>
      <div>
        <div className={style.Circle} style={{ borderColor: getColorFromGrade(효율등급) }}>
          <Image
            src={getImage(기자재명칭)}
            alt={기자재명칭}
            width={75}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </div>
      </div>
      <div className={style.RightContainer}>
        <div className={style.TextWrapper}>
          <div className={style.TextContainer}>
            <div className={style.TextBold}>모델명</div>
            <div className={style.TextRegular}>{모델명}</div>
          </div>
          <div className={style.TextContainer}>
            <div className={style.TextBold}>업체명</div>
            <div className={style.TextRegular}>{업체명칭}</div>
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
