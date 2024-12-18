"use client";

import { defaultOptions } from "@/lib/lottieOption";
import Lottie from "react-lottie";

export default function Loading() {
  return (
    <div
      style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
