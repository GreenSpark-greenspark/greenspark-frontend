import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";

const BillGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;
  const display = "bill";

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get(`${API_URL}/power/${userId}?display=${display}`);

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
  }, [API_URL, userId, display]);

  return <Graph data={graphData} isBillGraph={true} />;
};

export default BillGraph;
