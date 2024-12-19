import Chart from "@/../public/loading/chart.json";

// 캐릭터 로딩
export const lottieChart = {
  loop: true,
  autoplay: true,
  animationData: Chart,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
