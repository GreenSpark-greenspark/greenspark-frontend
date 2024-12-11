import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import ImgGraph from "../../../../public/img/graph-default.png";
import Image from "next/image";
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

const Line = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });

// 12개월의 월 이름을 반환하는 함수
const getLast12Months = (monthsToShow = 12): string[] => {
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

  for (let i = 0; i < monthsToShow; i++) {
    const monthIndex = (currentMonth - i + 12) % 12;
    result.unshift(months[monthIndex]);
  }

  return result;
};

type DataPoint = {
  value: number | null;
  year: number;
  month: number;
};

const createRecent24MonthsData = (data: DataPoint[], currentYear: number): DataPoint[] => {
  const result: DataPoint[] = Array(24).fill({ value: null, year: null, month: null });
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  data.forEach(entry => {
    const { year, month, value } = entry;
    const monthDiff = (currentYear - year) * 12 + (currentMonth - month);

    if (monthDiff >= 0 && monthDiff < 24) {
      result[23 - monthDiff] = { value: value === 0 ? null : value, year, month };
    }
  });

  return result;
};

interface GraphProps {
  data: DataPoint[];
  isBillGraph?: boolean;
}

const Graph: React.FC<GraphProps> = ({ data, isBillGraph = true }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  const currentYear = new Date().getFullYear();
  const recent24MonthsData = createRecent24MonthsData(data, currentYear);

  const thisYearData = recent24MonthsData.slice(12, 24).map(item => item.value);
  const lastYearData = recent24MonthsData.slice(0, 12).map(item => item.value);

  const dataSetLabel = isBillGraph ? "올해 전기요금" : "올해 전력사용량";
  const lastYearLabel = isBillGraph ? "1년 전 전기요금" : "1년 전 전력사용량";
  const unit = isBillGraph ? "원" : "kWh";

  const noData =
    thisYearData.every(value => value === null) && lastYearData.every(value => value === null);

  const labels = getLast12Months(noData ? 9 : 12); // 데이터가 없을때
  // const displayedData = noData ? Array(4).fill(null) : { thisYearData, lastYearData };

  const chartData: ChartData<"line"> = {
    labels,
    datasets: noData
      ? []
      : [
          {
            label: dataSetLabel,
            data: thisYearData,
            fill: true,
            backgroundColor: "rgba(25, 228, 7, 0.2)",
            borderColor: "#19E407",
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: "#19E407",
            pointHoverRadius: 9,
            pointHoverBorderColor: "#CBF4B8",
            pointHoverBorderWidth: 7,
            spanGaps: true
          },
          {
            label: lastYearLabel,
            data: lastYearData,
            fill: false,
            borderColor: "#C4C4C4",
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: "#C4C4C4",
            pointHoverRadius: 9,
            pointHoverBorderColor: "#E0E0E0",
            pointHoverBorderWidth: 7,
            spanGaps: true
          }
        ]
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
            return `${year}년 ${month}월\n${isBillGraph ? "전기요금" : "전력사용량"}`;
          },
          label: tooltipItem => {
            const datasetIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.dataIndex;

            const dataPoint =
              datasetIndex === 0
                ? recent24MonthsData[12 + dataIndex] // 올해 데이터
                : recent24MonthsData[dataIndex]; // 작년 데이터

            const { value } = dataPoint;
            return value !== null ? `${value.toLocaleString()}${unit}` : `데이터 없음`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, maxRotation: 0, minRotation: 0 },
        grid: { display: false }
      },
      y: {
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
        beginAtZero: true
      }
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{
        overflowX: noData ? "hidden" : "scroll",
        overflowY: "hidden",
        maxWidth: "100%",
        position: "relative"
      }}
    >
      <div style={{ width: noData ? "32rem" : "100rem", height: "13rem" }}>
        {noData ? (
          <div>
            <Image
              src={ImgGraph}
              alt="No Data Available"
              priority
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: "100%"
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "20rem",
                top: 50,
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#000000",
                fontSize: "1.2rem",
                fontWeight: "400",
                zIndex: 1,
                textAlign: "center"
              }}
            >
              정보를 입력하면 그래프를 볼 수 있어요!
            </div>
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default Graph;
