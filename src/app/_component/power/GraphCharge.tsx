import React, { useState } from "react";
import Box from "@/components/Box";
import styles from "./power.common.module.css";
import graphStyles from "./graph.common.module.css";

import BillGraph from "./BillGraph";
import UsageGraph from "./UsageGraph";

export default function GraphCharge() {
  const [activeButton, setActiveButton] = useState<string>("bill");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <>
      <p className={styles.title}>한 눈에 보는 내 파워</p>
      <div className={styles.wrap}>
        <Box>
          <div className={graphStyles.btnContainer}>
            <div
              className={`${graphStyles.graphBtn} ${activeButton === "bill" ? graphStyles.btnActive : ""}`}
              onClick={() => handleButtonClick("bill")}
            >
              <p>전기요금</p>
            </div>

            <div
              className={`${graphStyles.graphBtn} ${activeButton === "usage" ? graphStyles.btnActive : ""}`}
              onClick={() => handleButtonClick("usage")}
            >
              <p>전력사용량</p>
            </div>
          </div>
          {activeButton === "bill" && <BillGraph />}
          {activeButton === "usage" && <UsageGraph />}
        </Box>
      </div>
    </>
  );
}
