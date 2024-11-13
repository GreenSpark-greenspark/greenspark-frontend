import React from "react";
import { useRouter } from "next/navigation";
import styles from "../power/power.common.module.css";
import Box from "@/components/Box";

export default function HomeQuiz() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/book");
  };
  return (
    <>
      <p className={styles.title}>에너지 퀴즈️</p>

      <div className={styles.wrap}>
        <Box>
          <div className={styles.bodyContainer}>
            <p className={styles.text_title}>하루에 두 번 찾아오는 기회!</p>
            <p className={styles.text_normal}>
              매일 오전 7시,오후 6시에 2시간만 오픈되는
              <br />
              오늘의 에너지 퀴즈를 풀어보세요.
              <br />
              정답 하나 당 100포인트를 획득할 수 있어요!
            </p>
          </div>

          <button type="button" className={styles.btn} onClick={handleNavigate}>
            퀴즈풀러가기
          </button>
        </Box>
      </div>
    </>
  );
}
