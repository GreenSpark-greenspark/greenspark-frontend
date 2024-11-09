import style from "./Appliance.module.css";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import Image from "next/image";
import airConditioner from "@/../public/img/air-conditioner.png";
import refrigerator from "@/../public/img/refrigerator.png";
import washingMachine from "@/../public/img/washing-machine.png";

export default function Appliance({
  id,
  grade,
  type,
  width = 6.9
}: {
  id: number;
  grade: string;
  type: string;
  width?: number;
}) {
  const getImage = (type: string) => {
    switch (type) {
      case "전기진공청소기":
        return airConditioner;
      case "냉장고":
        return refrigerator;
      case "전기세탁기(일반)":
        return washingMachine;
      default:
        return washingMachine;
    }
  };

  return (
    <div
      key={id}
      className={style.CircleContainer}
      style={{ width: `${width}rem`, height: `${width + 2}rem` }}
    >
      <div
        className={style.Circle}
        style={{
          borderColor: getColorFromGrade(grade),
          width: `${width}rem`,
          height: `${width}rem`
        }}
      >
        <Image
          src={getImage(type)}
          alt={type}
          width={width * 4}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>
    </div>
  );
}
