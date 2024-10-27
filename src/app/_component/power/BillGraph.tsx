import React from "react";
import Graph from "./Graph";
import { powerGraph } from "@/mock/powerGraph";

const BillGraph = () => {
  return <Graph data={powerGraph} isBillGraph={true} />;
};

export default BillGraph;
