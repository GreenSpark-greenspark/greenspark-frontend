"use client";

import axios from "axios";
import Box from "@/components/Box";
import Link from "next/link";
import Appliance from "./Appliance";
import IconPlus from "@/../public/icon/power_plus.svg";
import style from "./MyAppliances.module.css";
import GradeLabel from "./GradeLabel";
import { useEffect, useState } from "react";
interface ApplianceData {
  applianceId: number;
  grade: string;
  matchTerm: string;
  updated?: boolean;
}

export default function MyAppliances() {
  const [data, setData] = useState<ApplianceData[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/appliances/${userId}`);
        if (response.data.success) {
          setData(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL, userId]);

  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.GridLayout}>
          {data.map(item => (
            <Link href={`/appliances/${item.applianceId}`} key={item.applianceId}>
              <div className={style.LinkContainer}>
                <Appliance id={item.applianceId} grade={item.grade} type={item.matchTerm} />
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
