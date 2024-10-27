import React from "react";
import Graph from "./Graph";
import { powerGraph } from "@/mock/powerGraph";

const UsageGraph = () => {
  return <Graph data={powerGraph} isBillGraph={false} />;
};

export default UsageGraph;
