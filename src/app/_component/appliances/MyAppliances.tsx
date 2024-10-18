import style from "./MyAppliances.module.css";
import IconPlus from "@/../public/icon/power_plus.svg";
import { data } from "@/mock/appliances";
import Image from "next/image";
import airConditioner from "@/../public/img/air-conditioner.png";
import refrigerator from "@/../public/img/refrigerator.png";
import washingMachine from "@/../public/img/washing-machine.png";
import { getColorfromGrade } from "@/utils/getColorfromgrade";

export default function Box() {
  // type에 따라 이미지 반환하는 함수 (추후 수정 필요)
  const getImage = (type: "airconditioner" | "refrigerator" | "washingMachine") => {
    switch (type) {
      case "airconditioner":
        return airConditioner;
      case "refrigerator":
        return refrigerator;
      case "washingMachine":
        return washingMachine;
      default:
        return washingMachine;
    }
  };

  const getBorderColor = getColorfromGrade;

  return (
    <div className={style.BoxWrapper}>
      <div className={style.Box}>
        {data.map(item => (
          <div key={item.id} className={style.CircleContainer}>
            <div className={style.Circle} style={{ borderColor: getBorderColor(item.grade) }}>
              <Image
                src={getImage(item.type)}
                alt={item.type}
                width={25}
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
            <div className={style.CircleText}>{item.grade}등급</div>
          </div>
        ))}
        <div className={style.AddCircle}>
          <IconPlus width={"2.4rem"} height={"2.4rem"} />
        </div>
      </div>
    </div>
  );
}
