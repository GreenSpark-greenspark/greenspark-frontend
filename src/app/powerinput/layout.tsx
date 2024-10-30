import TopBar from "@/components/TopBar";
import BottomNav from "@/components/bottomNav";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar text={"내 파워 입력하기"} />
      {children}
      <BottomNav />
    </>
  );
}
