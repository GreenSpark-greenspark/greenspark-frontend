import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

import { ChartData, ChartOptions } from "chart.js";

// Chart.js에서 필요한 컴포넌트들을 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart.js는 클라이언트에서만 렌더링하기 위해 dynamic import 사용
const Line = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });

// 12개월의 월 이름을 반환하는 함수
const getLast12Months = (): string[] => {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ];
  const result = [];
  const today = new Date();
  const currentMonth = today.getMonth();

  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12;
    result.unshift(months[monthIndex]); // 최신 달이 마지막이 되도록 unshift 사용
  }

  return result;
};

const data: ChartData<"line"> = {
  labels: getLast12Months(),
  datasets: [
    {
      label: "올해 전기요금",
      data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 60, 50, 77],
      fill: false,
      borderColor: "#19E407",
      borderWidth: 2,
      pointRadius: 2,
      pointBackgroundColor: "#19E407",
      pointHoverRadius: 8,
      pointHoverBorderColor: "#CBF4B8",
      pointHoverBorderWidth: 6
    },
    {
      label: "1년 전 전기요금",
      data: [90, 50, 75, 95, 50, 52, 45, 68, 88, 57, 48, 72],
      fill: false,
      borderColor: "#C4C4C4",
      borderWidth: 2,
      pointRadius: 2,
      pointBackgroundColor: "#C4C4C4",
      pointHoverRadius: 8,
      pointHoverBorderColor: "#E0E0E0",
      pointHoverBorderWidth: 6
    }
  ]
};

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 10
        },
        maxRotation: 0, // 글씨 기울어짐 없도록 설정
        minRotation: 0
      },
      grid: {
        display: false
      },
      title: {
        display: false
      },
      border: {
        color: "#5E5E5E",
        width: 2
      }
    },
    y: {
      ticks: {
        display: false
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
        lineWidth: 1
      },
      border: {
        display: false
      },
      beginAtZero: true // y축 값 0부터 시작
    }
  }
};

export default function BillGraph() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 스크롤을 가장 오른쪽으로 이동
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        overflowX: "scroll",
        overflowY: "hidden",
        maxWidth: "100%"
      }}
    >
      <div style={{ width: "56rem", height: "13rem" }}>
        {" "}
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
