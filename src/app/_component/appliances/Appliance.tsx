import style from "./Appliance.module.css";
import { getColorFromGrade } from "@/utils/getColorfromGrade";
import Image from "next/image";
import { getImage } from "@/utils/getImage";

export default function Appliance({
  id,
  grade,
  type,
  width = 6.9,
  alt
}: {
  id: number;
  grade: string;
  type: string;
  width?: number;
  alt?: string;
}) {
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
          alt={alt || type}
          width={50}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>
    </div>
  );
}
