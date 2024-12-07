import TopBar from "@/components/TopBar";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar text={"내 가전제품"} />
      {children}
    </>
  );
}
