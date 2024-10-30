"use client";
import React from "react";

import PowerInput from "../../_component/power/PowerInput";
import AICharge from "../../_component/power/AICharge";
import GraphCharge from "../../_component/power/GraphCharge";
import PreCharge from "../../_component/power/PreCharge";
import styled from "styled-components";

export default function Power() {
  return (
    <div>
      <PagesWrap>
        <PowerInput />
        <AICharge />
        <GraphCharge />
        <PreCharge />
      </PagesWrap>
    </div>
  );
}
const PagesWrap = styled.div`
  margin-top: 4rem;
  padding-bottom: 10rem;
`;
