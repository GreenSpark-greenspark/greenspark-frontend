"use client";
import { defaultOptions } from "@/lib/lottieOption";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Lottie from "react-lottie";

export default function GoogleCallbackPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/my`, { withCredentials: true });
        if (res.data.success) {
          const user = res.data.data;

          if (user && user.householdMembers != 0 && user.electricityDueDate != 0) {
            router.push("/main");
          } else {
            router.push("/profile");
          }
        } else {
          console.log("API 호출 실패:", res.data.message);
          router.push("/main");
        }
      } catch (error) {
        console.log("네트워킹 오류", error);
        router.push("/main");
      }
    };

    fetchUser();
    router.push("/main");
  });
  return (
    <div
      style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
