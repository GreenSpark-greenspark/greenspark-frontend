import { data } from "@/mock/appliances";
import Box from "@/components/Box";
import Link from "next/link";
import Appliance from "./Appliance";
import IconPlus from "@/../public/icon/power_plus.svg";
import style from "./MyAppliances.module.css";
import GradeLabel from "./GradeLabel";

export default function MyAppliances() {
  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.GridLayout}>
          {data.map(item => (
            <Link href={`/appliances/${item.id}`} key={item.id}>
              <div className={style.LinkContainer}>
                <Appliance id={item.id} grade={item.grade} type={item.type} />
                <GradeLabel grade={item.grade} />
              </div>
            </Link>
          ))}

          <Link href={`/appliances/add`}>
            <div className={style.LinkContainer}>
              <div className={style.AddCircle}>
                <IconPlus width={"2.4rem"} height={"2.4rem"} />
              </div>
            </div>
          </Link>
        </div>
      </Box>
    </div>
  );
}
