import TopBarToHome from "@/components/TopBarToHome";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBarToHome text={"내 가전제품"} />
      {children}
    </>
  );
}
