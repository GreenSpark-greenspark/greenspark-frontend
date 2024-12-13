import TopBarAppliance from "@/components/TopBarAppliance";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBarAppliance text={"내 가전제품"} />
      {children}
    </>
  );
}
