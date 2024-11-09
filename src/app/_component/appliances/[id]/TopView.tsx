import Image from "next/image";
import style from "./TopView.module.css";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import washingMachine from "@/../public/img/washing-machine.png";

interface TopViewProps {
  업체명칭: string;
  모델명: string;
  기자재명칭: string;
  효율등급: string;
}

const TopView = ({ 업체명칭, 기자재명칭, 모델명, 효율등급 }: TopViewProps) => {
  const getImage = (type: string) => {
    switch (type) {
      case "전기세탁기(일반)":
        return washingMachine;
      case "김치냉장고":
        return washingMachine;
      default:
        return washingMachine;
    }
  };

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
          <div className={style.GrayBtn}>{기자재명칭}</div>
          <div className={style.ColorBtn} style={{ backgroundColor: getColorFromGrade(효율등급) }}>
            {효율등급}등급
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopView;
