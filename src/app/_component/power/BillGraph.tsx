import React, { useEffect, useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import styles from "./power.common.module.css";
import Lottie from "react-lottie";
import { defaultOptions } from "@/lib/lottieOption";

const BillGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const display = "bill";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/power`, {
          params: { display },
          withCredentials: true
        });

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
  }, [API_URL, display]);

  if (isLoading) {
    return (
      <div className={styles.LoadingWrapper}>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return <Graph data={graphData} isBillGraph={true} />;
};

export default BillGraph;
