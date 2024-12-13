import MyAppliances from "@/app/_component/appliances/MyAppliances";
import TopBarApplianceToHome from "@/components/TopBarApplianceToHome";

export default function Page() {
  return (
    <div style={{ height: "100vh", paddingBottom: "1rem" }}>
      <TopBarApplianceToHome text={"내 가전제품"} />
      <MyAppliances />
    </div>
  );
}
