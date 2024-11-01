import React from "react";
import HomeQuiz from "./_component/home/HomeQuiz";
import HomeEncyclopedia from "./_component/home/HomeEncyclopedia";
import AttendanceCoin from "./_component/home/AttendanceCoin";
import HomePower from "./_component/home/HomePower";
import HomeAppliances from "./_component/home/HomeAppliances";

export default function Page() {
  return (
    <div>
      <AttendanceCoin />
      <HomePower />
      <HomeAppliances />
      <HomeQuiz />
      <HomeEncyclopedia />
    </div>
  );
}
