import TopBar from "@/components/TopBar";
import BottomNav from "@/components/bottomNav";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar text={"기프티콘 상점"} />
      {children}
      <BottomNav />
    </>
  );
}
