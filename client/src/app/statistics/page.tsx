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
import { Alert, Box, CircularProgress } from "@mui/material";

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
      <Box
        sx={{
          background:
            "linear-gradient(134.49deg, rgba(9, 58, 237, 0.18) -0.83%, rgba(1, 215, 235, 0.15) 54.23%) ",
          backdropFilter: "blur(80px)",
          minHeight: "100vh",
        }}
      >
        <MiniDrawer />
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        background:
          "linear-gradient(134.49deg, rgba(9, 58, 237, 0.18) -0.83%, rgba(1, 215, 235, 0.15) 54.23%) ",
        backdropFilter: "blur(80px)",
        minHeight: "100vh",
      }}
    >
      <MiniDrawer />
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box sx={{ padding: 4 }}>
          <PerformanceSumCard performacesumDatas={PERORMANCESUM_DUMMY_DATA} />
          <Performance dataSeries={ALL_SERIES_PERFORMANCE} />
          <SpecificPostsCard
            customCardsDetails={statisticsData}
            dataSeries={ALL_SERIES_SPESIFIC}
            avg={avg}
          />
        </Box>
      )}
    </Box>
  );
}
