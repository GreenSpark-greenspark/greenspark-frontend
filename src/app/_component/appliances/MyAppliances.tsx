import style from "./MyAppliances.module.css";
import IconPlus from "@/../public/icon/power_plus.svg";
import { data } from "@/mock/appliances";
import Appliance from "./Appliance";
import Link from "next/link";

export default function Box() {
  return (
    <div className={style.BoxWrapper}>
      <div className={style.Box}>
        {data.map(item => (
          <Link href={`/appliances/${item.id}`}>
            <Appliance id={item.id} grade={item.grade} type={item.type} />
          </Link>
        ))}
        <div className={style.AddCircle}>
          <IconPlus width={"2.4rem"} height={"2.4rem"} />
        </div>
      </div>
    </div>
  );
}
