"use client";
import React from "react";

import NowPower from "../_component/power/NowPower";
import AICharge from "../_component/power/AICharge";
import GraphCharge from "../_component/power/GraphCharge";
import PreCharge from "../_component/power/PreCharge";
import styled from "styled-components";

export default function Power() {
  return (
    <div>
      <PagesWrap>
        <NowPower />
        <AICharge />
        <GraphCharge />
        <PreCharge />
      </PagesWrap>
    </div>
  );
}
const PagesWrap = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
`;
