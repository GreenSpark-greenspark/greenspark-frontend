import MyAppliances from "@/app/_component/appliances/MyAppliances";
import TopBarToHome from "@/components/TopBarToHome";

export default function Page() {
  return (
    <div style={{ height: "100vh", paddingBottom: "1rem" }}>
      <TopBarToHome text={"내 가전제품"} />
      <MyAppliances />
    </div>
  );
}
