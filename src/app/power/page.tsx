import React from "react";

import NowPower from "../_component/power/NowPower";
import AICharge from "../_component/power/AICharge";
import GraphCharge from "../_component/power/GraphCharge";
import PreCharge from "../_component/power/PreCharge";

export default function Power() {
  return (
    <div>
      <NowPower />
      <AICharge />
      <GraphCharge />
      <PreCharge />
    </div>
  );
}
