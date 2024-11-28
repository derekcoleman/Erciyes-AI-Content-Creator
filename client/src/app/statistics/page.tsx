import PerformanceSumCard from "@/components/card/PerfomanceSumCard";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import Performance from "@/components/card/Performance";
import SpecificPostsCard from "@/components/card/SpecificPostsCard";

export default function StatisticPage() {
  return (
    <MiniDrawer>
      <PerformanceSumCard />
      <Performance />
      <SpecificPostsCard />
    </MiniDrawer>
  );
}
