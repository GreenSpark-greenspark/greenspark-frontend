import TopBarToHome from "@/components/TopBarToHome";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBarToHome text={"에너지 퀴즈"} />
      {children}
    </>
  );
}
