import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import { apiWrapper } from "@/utils/api";

const UsageGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const display = "usage";

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await apiWrapper(
          () =>
            axios.get(`${API_URL}/power`, {
              params: { display },
              withCredentials: true 
            }),
          API_URL
        );

        if (response.data.success) {
          setGraphData(response.data.data);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchGraphData();
  }, [API_URL, display]);

  return <Graph data={graphData} isBillGraph={false} />;
};

export default UsageGraph;
