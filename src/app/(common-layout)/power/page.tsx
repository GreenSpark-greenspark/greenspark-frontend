"use client";
import React from "react";

import PowerInput from "../../_component/power/PowerInput";
import AICharge from "../../_component/power/AICharge";
import GraphCharge from "../../_component/power/GraphCharge";
import PreCharge from "../../_component/power/PreCharge";

export default function Power() {
  return (
    <div
      style={{ height: "100vh", overflowY: "scroll", paddingBottom: "10rem", marginTop: "4rem" }}
    >
      <PowerInput />
      <AICharge />
      <GraphCharge />
      <PreCharge />
    </div>
  );
}
