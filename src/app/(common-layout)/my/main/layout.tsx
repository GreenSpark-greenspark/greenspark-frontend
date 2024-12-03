import TopBarToHome from "@/components/TopBarToHome";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBarToHome text={"마이 페이지"} />
      {children}
    </>
  );
}
