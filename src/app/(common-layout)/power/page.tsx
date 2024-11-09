"use client";
import React from "react";

import PowerInput from "../../_component/power/PowerInput";
import ExpectPreCost from "../../_component/power/ExpectPreCost";
import GraphCharge from "../../_component/power/GraphCharge";

export default function Power() {
  return (
    <div
      style={{ height: "100vh", overflowY: "scroll", paddingBottom: "10rem", marginTop: "4rem" }}
    >
      <GraphCharge />
      <PowerInput />
      <ExpectPreCost />
    </div>
  );
}
