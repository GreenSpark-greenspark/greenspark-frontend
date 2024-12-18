"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PointShop from "@/app/_component/my/PointShop";
import { defaultOptions } from "@/lib/lottieOption";
import Lottie from "react-lottie";

const Page = () => {
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
        <>
          <PointShop />
        </>
      ) : (
        <div
          style={{
            width: "375px",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </div>
  );
};

export default Page;
