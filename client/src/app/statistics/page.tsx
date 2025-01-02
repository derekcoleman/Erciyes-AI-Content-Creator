"use client";
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
import { getStatistics } from "@/lib/utils";
import { StatisticsData } from "@/lib/types";
import { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";

export default function StatisticPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statisticsData, setStatisticsData] = useState<StatisticsData>();

  const fetchStatistics = async () => {
    try {
      const fetchedData = await getStatistics();
      setStatisticsData(fetchedData);
      console.log("fetchedData", fetchedData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <MiniDrawer>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </MiniDrawer>
    );
  }
  return (
    <MiniDrawer>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <PerformanceSumCard performacesumDatas={PERORMANCESUM_DUMMY_DATA} />
          <Performance dataSeries={ALL_SERIES_PERFORMANCE} />
          <SpecificPostsCard
            customCardsDetails={statisticsData}
            dataSeries={ALL_SERIES_SPESIFIC}
            avg={avg}
          />
        </>
      )}
    </MiniDrawer>
  );
}
