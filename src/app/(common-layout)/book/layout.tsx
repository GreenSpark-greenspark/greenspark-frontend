import TopBar from "@/components/TopBar";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar text={"에너지 백과"} />
      {children}
    </>
  );
}
