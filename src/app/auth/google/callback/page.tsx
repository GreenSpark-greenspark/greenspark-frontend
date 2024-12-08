"use client";
import LoadingDots from "@/components/LoadingDots";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <LoadingDots />
    </div>
  );
}
