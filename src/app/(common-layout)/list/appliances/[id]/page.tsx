"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { mapApplianceDetails } from "@/utils/renderApplianceDetails";
import { decodeHtmlEntities } from "@/utils/decodeHtmlEntities";
import style from "./page.module.css";
import TopView from "@/app/_component/appliances/[id]/TopView";
import BottomView from "@/app/_component/appliances/[id]/BottomView";
import LoadingDots from "@/components/LoadingDots";
import DeleteBtn from "@/app/_component/appliances/[id]/DeleteBtn";
import { apiWrapper } from "@/utils/api";
import MemoBtn from "@/app/_component/appliances/[id]/MemoBtn";
import { getGradientFromGrade } from "@/utils/getColorfromGrade";

export default function AppliancePage({ params }: { params: { id: string | string[] } }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [applianceDetails, setApplianceDetails] = useState<any>(null);
  const [previousGrade, setPreviousGrade] = useState<string | null>(null); // 이전 효율 등급
  const [memo, setMemo] = useState<string | null>(null);
  const [hasMemo, setHasMemo] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchApplianceData = async () => {
    try {
      const response = await apiWrapper(
        () =>
          axios.get(`${API_URL}/appliances/detail/${params.id}`, {
            withCredentials: true
          }),
        API_URL
      );

      if (response.data.success) {
        const parsedData = JSON.parse(response.data.data);
        const decodedData = decodeHtmlEntities(parsedData);
        const items = decodedData.items || [];
        const memoData = decodedData.memos || null;

        const applianceType = items[0]?.MACH_TERM || "Unknown";

        const transformedItem = {
          업체명칭: items[0]?.ENTE_TERM,
          기자재명칭: items[0]?.MACH_TERM,
          모델명: items[0]?.MODEL_TERM,
          구모델명: items[0]?.OLDX_MODEL_TERM,
          제조원: items[0]?.MANUFAC_MAN_TERM,
          효율등급: items[0]?.GRADE,
          updated: items[0]?.updated,
          applianceId: items[0]?.applianceId,
          ...items[0]
        };
        console.log(items[0].updated);

        const mappedDetails = mapApplianceDetails(transformedItem, applianceType);
        setApplianceDetails(mappedDetails);
        console.log(mappedDetails);

        const memoContent = memoData[0]?.content || null;
        setMemo(memoContent);
        setHasMemo(!!memoContent);

        // updated가 true일 때 이전 효율 등급 가져오기
        if (items[0]?.updated) {
          const historyResponse = await axios.get(`${API_URL}/appliances/history`, {
            withCredentials: true
          });

          if (historyResponse.data.success) {
            // historyResponse.data.data가 배열인지 확인 후 find 호출
            const historyData = historyResponse.data.data;

            if (Array.isArray(historyData)) {
              const historyItem = historyData.find(
                (item: { applianceId: string }) => item.applianceId === params.id
              );

              if (historyItem) {
                const { previousGrade } = historyItem;
                setPreviousGrade(previousGrade); // 이전 효율 등급
              }
            } else {
              console.error("History API의 데이터가 배열이 아닙니다.");
            }
          } else {
            console.error("History API 호출 실패:", historyResponse.data.message);
          }
        }
      } else {
        console.error("API 요청 실패:", response.data.message);
      }
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplianceData();
  }, [params.id]);

  const handleMemoAdded = (newMemo: string) => {
    setMemo(newMemo);
    setHasMemo(!!newMemo);
  };

  if (loading)
    return (
      <div
        style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoadingDots />
      </div>
    );
  if (!applianceDetails) return <p>데이터가 없습니다.</p>;

  // 그라디언트를 적용할지 여부를 확인: updated가 true일 때만 적용
  const shouldApplyGradient =
    applianceDetails.updated && previousGrade && applianceDetails.효율등급 !== previousGrade;
  const gradient = shouldApplyGradient ? getGradientFromGrade(applianceDetails.효율등급) : null;

  return (
    <div className={style.BoxWrapper}>
      <div
        className={style.Box}
        style={{
          backgroundImage: gradient
            ? `linear-gradient(#fff, #fff), linear-gradient(${gradient.first} 0%, ${gradient.second} 50%, ${gradient.third} 100%)`
            : "none"
        }}
      >
        <div className={style.BoxPadding}>
          <div className={style.ViewWrapper}>
            {applianceDetails.updated && previousGrade && (
              <div className={style.changeGradeWrapper}>
                {`에너지효율등급이 ${previousGrade} → ${applianceDetails.효율등급} 등급으로 변경되었어요!`}
              </div>
            )}
            <TopView {...applianceDetails} />
            <BottomView {...applianceDetails} />
          </div>
          {memo ? <div className={style.memoTitle}>메모</div> : ""}
          <div className={style.memoSection}>
            {memo ? <div className={style.memoItem}>{memo}</div> : ""}
          </div>
          <div className={style.BtnWrapper}>
            <DeleteBtn applianceId={params.id} />
            <MemoBtn applianceId={params.id} hasMemo={hasMemo} onMemoAdded={handleMemoAdded} />
          </div>
        </div>
      </div>
      <div className={style.margin} />
    </div>
  );
}
