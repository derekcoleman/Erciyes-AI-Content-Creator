import PerformanceSumCard from "@/components/card/PerfomanceSumCard";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import Performance from "@/components/card/Performance";
import SpecificPostsCard from "@/components/card/SpecificPostsCard";
import {
  ALL_SERIES_PERFORMANCE,
  ALL_SERIES_SPESIFIC,
  avg,
  customCardsDetails,
  PERORMANCESUM_DUMMY_DATA,
} from "@/lib/conts";

export default function StatisticPage() {
  return (
    <MiniDrawer>
      <PerformanceSumCard performacesumDatas={PERORMANCESUM_DUMMY_DATA} />
      <Performance dataSeries={ALL_SERIES_PERFORMANCE} />
      <SpecificPostsCard
        customCardsDetails={customCardsDetails}
        dataSeries={ALL_SERIES_SPESIFIC}
        avg={avg}
      />
    </MiniDrawer>
  );
}
