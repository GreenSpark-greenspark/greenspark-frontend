"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@/components/Box";
import { mapApplianceDetails } from "@/utils/renderApplianceDetails";
import { decodeHtmlEntities } from "@/utils/decodeHtmlEntities";
import style from "./page.module.css";
import TopView from "@/app/_component/appliances/[id]/TopView";
import BottomView from "@/app/_component/appliances/[id]/BottomView";
import LoadingDots from "@/components/LoadingDots";

export default function AppliancePage({ params }: { params: { id: string | string[] } }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [applianceDetails, setApplianceDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplianceData = async () => {
      try {
        const response = await axios.get(`${API_URL}/appliances/detail/${params.id}`);

        if (response.data.success) {
          const parsedData = JSON.parse(response.data.data);
          const decodedData = decodeHtmlEntities(parsedData);
          console.log(decodedData);
          const items = decodedData.items;

          const applianceType = items[0].MACH_TERM || "Unknown";

          const transformedItem = {
            업체명칭: items[0].ENTE_TERM,
            기자재명칭: items[0].MACH_TERM,
            모델명: items[0].MODEL_TERM,
            구모델명: items[0].OLDX_MODEL_TERM,
            제조원: items[0].MANUFAC_MAN_TERM,
            효율등급: items[0].GRADE,
            ...items[0]
          };

          const mappedDetails = mapApplianceDetails(transformedItem, applianceType);
          setApplianceDetails(mappedDetails);
        } else {
          console.error("API 요청 실패:", response.data.message);
        }
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplianceData();
  }, [params.id]);

  if (loading)
    return (
      <div
        style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoadingDots />
      </div>
    );
  if (!applianceDetails) return <p>No data available</p>;

  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.ViewWrapper}>
          <TopView {...applianceDetails} />
          <BottomView {...applianceDetails} />
        </div>
      </Box>
    </div>
  );
}
