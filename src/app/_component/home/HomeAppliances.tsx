"use client";
import React, { useEffect, useState } from "react";
import style from "./HomeAppliances.module.css";
import Box from "@/components/Box";
import axios from "axios";
import Link from "next/link";
import Appliance from "../appliances/Appliance";
import GradeLabel from "../appliances/GradeLabel";
import IconPlus from "@/../public/icon/home_plus.svg";

interface ApplianceData {
  applianceId: number;
  grade: string;
  matchTerm: string;
  updated?: boolean;
}

export default function HomeAppliances() {
  const [data, setData] = useState<ApplianceData[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/appliances/preview`, {
          withCredentials: true
        });

        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL]);

  return (
    <>
      <p className={style.title}>내 가전제품 </p>
      <div className={style.wrap}>
        <Box minHeight={"113px"}>
          <div className={style.flexLayout}>
            <div className={style.flexLayout}>
              {data.map(item => (
                <Link href={`list/appliances/${item.applianceId}`} key={item.applianceId}>
                  <div className={style.LinkContainer}>
                    <Appliance id={item.applianceId} grade={item.grade} type={item.matchTerm} />
                    <GradeLabel grade={item.grade} />
                  </div>
                </Link>
              ))}
            </div>
            <Link href={`/appliances/add`}>
              <div className={style.LinkContainer}>
                <div className={style.AddCircle}>
                  <IconPlus width={"1.2rem"} height={"1.2rem"} />
                </div>
                <div className={style.placeholder}></div>
              </div>
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
}
