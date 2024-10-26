import style from "./Appliance.module.css";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import Image from "next/image";
import airConditioner from "@/../public/img/air-conditioner.png";
import refrigerator from "@/../public/img/refrigerator.png";
import washingMachine from "@/../public/img/washing-machine.png";
import { ApplianceType } from "@/mock/appliances";

export default function Appliance({
  id,
  grade,
  type
}: {
  id: number;
  grade: number;
  type: ApplianceType;
}) {
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

  return (
    <div key={id} className={style.CircleContainer}>
      <div className={style.Circle} style={{ borderColor: getColorFromGrade(grade) }}>
        <Image
          src={getImage(type)}
          alt={type}
          width={25}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>
      <div className={style.CircleText}>{grade}등급</div>
    </div>
  );
}
