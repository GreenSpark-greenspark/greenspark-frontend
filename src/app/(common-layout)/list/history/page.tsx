import History from "@/app/_component/appliances/history/History";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <div style={{ height: "100vh", paddingBottom: "1rem", background: "#fff" }}>
      <TopBar text={"내 가전제품 히스토리"} />
      <History />
    </div>
  );
}
