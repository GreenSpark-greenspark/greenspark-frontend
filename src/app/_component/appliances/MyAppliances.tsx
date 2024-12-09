"use client";

import axios from "axios";
import Box from "@/components/Box";
import Link from "next/link";
import Appliance from "./Appliance";
import IconPlus from "@/../public/icon/power_plus.svg";
import style from "./MyAppliances.module.css";
import GradeLabel from "./GradeLabel";
import { useEffect, useState } from "react";
import LoadingDots from "@/components/LoadingDots";
import { apiWrapper } from "@/utils/api";

interface ApplianceData {
  applianceId: number;
  grade: string;
  matchTerm: string;
  updated: boolean;
}

export default function MyAppliances() {
  const [data, setData] = useState<ApplianceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchAppliances = async (): Promise<ApplianceData[]> => {
    return apiWrapper(async () => {
      const response = await axios.get(`${API_URL}/appliances`, { withCredentials: true });
      if (response.data.success) {
        console.log("데이터 로드 성공:", response.data.data);
        return response.data.data;
      } else {
        console.error("API 호출 실패:", response.data.message);
        throw new Error("Failed to fetch appliances");
      }
    }, API_URL);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const appliances = await fetchAppliances();
        setData(appliances);
      } catch (error) {
        console.error("데이터 로드 실패.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  if (isLoading) {
    return (
      <div className={style.LoadingWrapper}>
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.GridLayout}>
          {data.map(item => (
            <Link href={`list/appliances/${item.applianceId}`} key={item.applianceId}>
              <div className={style.LinkContainer}>
                {item.updated ? (
                  <div className={style.alarm}></div>
                ) : (
                  <div className={style.lastAlarm}></div>
                )}
                <Appliance id={item.applianceId} grade={item.grade} type={item.matchTerm} />
                <GradeLabel grade={item.grade} />
              </div>
            </Link>
          ))}
          <Link href={`list/appliances/add`}>
            <div className={style.LinkContainer}>
              <div className={style.lastAlarm}></div>
              <div className={style.AddCircle}>
                <IconPlus width={"2.4rem"} height={"2.4rem"} />
              </div>
              <div className={style.lastLabel}>
                <GradeLabel grade={""} />
              </div>
            </div>
          </Link>
        </div>
      </Box>
    </div>
  );
}
