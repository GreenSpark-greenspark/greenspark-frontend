import Confetti from "@/../public/loading/confetti.json";
// 캐릭터 로딩
export const confetti = {
  loop: true,
  autoplay: true,
  animationData: Confetti,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
