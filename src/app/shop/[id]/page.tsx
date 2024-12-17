"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import GiftPurchase from "@/app/_component/my/GiftPurchase";

const Page = () => {
  const { id } = useParams();

  const idNumber = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
  const [tokenRenewed, setTokenRenewed] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const renewToken = async () => {
      try {
        const response = await axios.post(`${API_URL}/reissue`, {}, { withCredentials: true });
        if (response.data.success) {
          console.log("토큰 갱신 성공");
          setTokenRenewed(true);
        } else {
          console.error("토큰 갱신 실패:", response.data.message);
        }
      } catch (error) {
        console.error("토큰 갱신 중 오류 발생:", error);
      }
    };

    renewToken();
  }, [API_URL]);
  return (
    <div style={{ height: "100vh" }}>
      {tokenRenewed ? (
        <>{idNumber ? <GiftPurchase id={idNumber} /> : <p>Loading...</p>}</>
      ) : (
        <p>토큰 갱신 중...</p>
      )}
    </div>
  );
};

export default Page;
