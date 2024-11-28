import PerformanceSumCard from "@/components/card/PerfomanceSumCard";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import Performance from "@/components/card/Performance";

export default function StatisticPage() {
  return (
    <MiniDrawer>
      <PerformanceSumCard />
      <Performance />
    </MiniDrawer>
  );
}
