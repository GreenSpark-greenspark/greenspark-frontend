"use client";
import React from "react";
import styled from "styled-components";
import PowerTable from "../_component/powerinput/PowerTable";

export default function Page() {
  return (
    <>
      <ChartTitle>+ 버튼을 눌러 입력할 수 있어요!</ChartTitle>
      <PowerTable />
    </>
  );
}

const ChartTitle = styled.p`
    color: var(--Color-4, #929292);
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;
