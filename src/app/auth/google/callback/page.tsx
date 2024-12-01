"use client";
import LoadingDots from "@/components/LoadingDots";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/main");
  }, [router]);
  return (
    <div
      style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <LoadingDots />
    </div>
  );
}
