import style from "./MyAppliances.module.css";
import IconPlus from "@/../public/icon/power_plus.svg";
import { data } from "@/mock/appliances";
import Appliance from "./Appliance";

export default function Box() {
  return (
    <div className={style.BoxWrapper}>
      <div className={style.Box}>
        {data.map(item => (
          <Appliance key={item.id} id={item.id} grade={item.grade} type={item.type} />
        ))}
        <div className={style.AddCircle}>
          <IconPlus width={"2.4rem"} height={"2.4rem"} />
        </div>
      </div>
    </div>
  );
}
