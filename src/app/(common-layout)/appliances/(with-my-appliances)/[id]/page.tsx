"use client";
import axios from "axios";
import Box from "@/components/Box";
import { mapApplianceDetails } from "@/utils/renderApplianceDetails";
import style from "./page.module.css";
import TopView from "@/app/_component/appliances/[id]/TopView";
import BottomView from "@/app/_component/appliances/[id]/BottomView";
import { useEffect, useState } from "react";

interface ApplianceData {
  업체명칭: string;
  기자재명칭: string;
  모델명: string;
  구모델명: string | null;
  제조원: string;
  효율등급: string;
  [key: string]: any;
}

export default function AppliancePage({ params }: { params: { id: string | string[] } }) {
  const [data, setData] = useState<ApplianceData[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCostData = async () => {
      try {
        console.log("Fetching data for ID:", params.id);
        const response = await axios.get(`${API_URL}/appliances/detail/${params.id}`);
        console.log("API Response:", response.data);

        if (response.data.success) {
          const parsedData = JSON.parse(response.data.data);
          console.log("Parsed Data:", parsedData);
          setData(parsedData);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCostData();
  }, [API_URL, params.id]);

  if (data.length === 0) return <p>No data available</p>;

  const applianceType = data[0].MACH_TERM || "Unknown";
  const transformedItem = mapApplianceDetails(data[0], applianceType);

  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.ViewWrapper}>
          <TopView {...transformedItem} />
          <BottomView {...transformedItem} />
        </div>
      </Box>
    </div>
  );
}
