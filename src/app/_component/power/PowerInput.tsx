import React from "react";
import "./power.common.css";
import Box from "@/components/Box";

export default function NowPower() {
  return (
    <>
      <div className="wrap">
        <Box>
          <div className="powerinput">
            <p className="text_normal">내 파워를 입력해주세요!</p>
            <button className="btn">입력하러 가기</button>
          </div>
        </Box>
      </div>
    </>
  );
}
