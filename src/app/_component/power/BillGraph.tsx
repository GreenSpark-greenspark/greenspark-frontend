import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import LoadingDots from "@/components/LoadingDots";
import styles from "./power.common.module.css";

const BillGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;
  const display = "bill";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/power/${userId}?display=${display}`);

        if (response.data.success) {
          setGraphData(response.data.data);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraphData();
  }, [API_URL, userId, display]);
  if (isLoading) {
    return (
      <div className={styles.LoadingWrapper}>
        <LoadingDots />
      </div>
    );
  }
  return <Graph data={graphData} isBillGraph={true} />;
};

export default BillGraph;
