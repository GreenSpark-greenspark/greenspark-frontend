import MyAppliances from "@/app/_component/appliances/MyAppliances";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar text={"내 가전제품"} />
      <MyAppliances />
    </>
  );
}
