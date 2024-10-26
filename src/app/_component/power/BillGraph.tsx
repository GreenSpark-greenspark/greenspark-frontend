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
import { powerGraph } from "@/mock/powerGraph";

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

type DataPoint = {
  value: number;
  year: number;
  month: number;
};

// 현재 월 기준으로 최근 24개월 데이터를 채워주는 함수
const createRecent24MonthsData = (data: any[], currentYear: number): DataPoint[] => {
  const result: DataPoint[] = Array(24).fill({ value: null, year: null, month: null });
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  // 데이터를 24개월 기준으로 매칭
  data.forEach(entry => {
    const { year, month, value } = entry;
    const monthDiff = (currentYear - year) * 12 + (currentMonth - month);

    if (monthDiff >= 0 && monthDiff < 24) {
      result[23 - monthDiff] = { value, year, month }; // 월에 맞는 데이터 배치
    }
  });

  return result;
};

const BillGraph = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 스크롤을 가장 오른쪽으로 이동
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const currentYear = new Date().getFullYear();

  const recent24MonthsData = createRecent24MonthsData(powerGraph, currentYear);

  // 올해, 작년 데이터 추출
  const thisYearData = recent24MonthsData.slice(12, 24).map(item => item.value);
  const lastYearData = recent24MonthsData.slice(0, 12).map(item => item.value);

  const data: ChartData<"line"> = {
    labels: getLast12Months(),
    datasets: [
      {
        label: "올해 전기요금",
        data: thisYearData,
        fill: false,
        borderColor: "#19E407",
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: "#19E407",
        pointHoverRadius: 8,
        pointHoverBorderColor: "#CBF4B8",
        pointHoverBorderWidth: 6,
        spanGaps: true
      },
      {
        label: "1년 전 전기요금",
        data: lastYearData,
        fill: false,
        borderColor: "#C4C4C4",
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: "#C4C4C4",
        pointHoverRadius: 8,
        pointHoverBorderColor: "#E0E0E0",
        pointHoverBorderWidth: 6,
        spanGaps: true
      }
    ]
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "#F1F3F5",
        titleFont: { size: 10, weight: 400 },
        titleColor: "#333333",
        titleAlign: "center",
        bodyFont: { size: 10, weight: 700 },
        bodyColor: "#000000",
        bodyAlign: "center",
        padding: 10,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: tooltipItems => {
            const item = tooltipItems[0];
            const datasetIndex = item.datasetIndex;
            const dataIndex = item.dataIndex;

            const dataPoint =
              datasetIndex === 0
                ? recent24MonthsData[12 + dataIndex] // 올해 데이터
                : recent24MonthsData[dataIndex]; // 작년 데이터

            const { year, month } = dataPoint;
            return `${year}년 ${month}월\n전기요금`;
          },
          label: tooltipItem => {
            const datasetIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.dataIndex;

            // 작년 데이터는 recent24MonthsData의 첫 12개월에, 올해 데이터는 마지막 12개월에 위치
            const dataPoint =
              datasetIndex === 0
                ? recent24MonthsData[12 + dataIndex] // 올해 데이터
                : recent24MonthsData[dataIndex]; // 작년 데이터

            const { value } = dataPoint;
            return `${value.toLocaleString()}원`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: { size: 10 },
          maxRotation: 0, // 글씨 기울어짐 없도록 설정
          minRotation: 0
        },
        grid: {
          display: false
        },
        border: { color: "#5E5E5E", width: 2 }
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
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
export default BillGraph;
