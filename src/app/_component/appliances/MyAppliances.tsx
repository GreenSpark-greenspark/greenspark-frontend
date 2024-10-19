import { data } from "@/mock/appliances";
import Box from "@/components/Box";
import Link from "next/link";
import Appliance from "./Appliance";
import IconPlus from "@/../public/icon/power_plus.svg";
import style from "./MyAppliances.module.css";

export default function MyAppliances() {
  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.GridLayout}>
          {data.map(item => (
            <Link href={`/appliances/${item.id}`} key={item.id}>
              <Appliance id={item.id} grade={item.grade} type={item.type} />
            </Link>
          ))}
          <Link href={`/appliances/add`}>
            <div className={style.AddCircle}>
              <IconPlus width={"2.4rem"} height={"2.4rem"} />
            </div>
          </Link>
        </div>
      </Box>
    </div>
  );
}
