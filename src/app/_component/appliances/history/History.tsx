"use client";

import Image from "next/image";
import style from "./History.module.css";
import { getImage } from "@/utils/getImage";
import { getDisplayName } from "@/utils/getDisplayName";
import { apiWrapper } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function History() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  //   const mockResponse = {
  //     success: true,
  //     code: 0,
  //     data: [
  //       {
  //         applianceId: 81,
  //         previousGrade: "1",
  //         nextGrade: "4",
  //         matchTerm: "전기냉장고",
  //         callDate: "2024-12-01"
  //       },
  //       {
  //         applianceId: 93,
  //         previousGrade: "3",
  //         nextGrade: "2",
  //         matchTerm: "제습기",
  //         callDate: "2024-12-01"
  //       }
  //     ]
  //   };
  //   const fetchedData = mockResponse.data;

  const fetchHistory = async () => {
    apiWrapper(async () => {
      const response = await axios.get(`${API_URL}/appliances/history`, { withCredentials: true });
      if (response.data.success) {
        console.log("데이터 로드 성공:", response.data.data);
        setFetchedData(response.data.data);
      } else {
        console.error("API 호출 실패:", response.data.message);
        throw new Error("Failed to fetch appliances history");
      }
    }, API_URL);
  };

  // callDate 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  // API 호출
  useEffect(() => {
    fetchHistory();
  }, [API_URL]);

  return (
    <div className={style.pageWrapper}>
      {fetchedData.length === 0 ? (
        <div className={style.noHistory}>효율등급이 변경된 제품이 없습니다.</div>
      ) : (
        <>
          <div className={style.hr}></div>
          {fetchedData.map(item => (
            <div key={item.applianceId}>
              <div className={style.section}>
                <div className={style.imgWrapper}>
                  <Image src={getImage(item.matchTerm)} alt={item.matchTerm} width={50} />
                </div>
                <div className={style.textWrapper}>
                  <div className={style.title}>{getDisplayName(item.matchTerm)} 효율등급 변경</div>
                  <div className={style.text}>
                    {getDisplayName(item.matchTerm)} 효율등급이
                    <br />
                    <span className={style.textBold}>{item.previousGrade}등급</span>에서
                    <span className={style.textBold}> {item.nextGrade}등급</span>으로
                    변경되었습니다.
                  </div>
                </div>
                <div className={style.dateText}>{formatDate(item.callDate)}</div>
              </div>
              <div className={style.hr}></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
