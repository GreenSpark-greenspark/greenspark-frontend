import Loading from "@/../public/loading/loading.json";

// 캐릭터 로딩
export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
