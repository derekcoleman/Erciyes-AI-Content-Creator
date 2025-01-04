"use client";
import PerformanceSumCard from "@/components/card/PerfomanceSumCard";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import Performance from "@/components/card/Performance";
import SpecificPostsCard from "@/components/card/SpecificPostsCard";
import { getStatistics } from "@/lib/utils";
import { PostStatistics, StatisticsData, TotalData } from "@/lib/types";
import { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";

interface SeriesData {
  color: string;
  label: string;
  data: number[];
}

export default function StatisticPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statisticsData, setStatisticsData] = useState<StatisticsData>();
  const [seriesData, setSeriesData] = useState<SeriesData[]>([]);
  const [performanceSumData, setPerformanceSumData] = useState<
    {
      count: number;
      title: string;
    }[]
  >([]);
  const [performanceData, setPerformanceData] = useState<
    {
      color: string;
      label: string;
      data: number[];
    }[]
  >([]);

  const [avg, setAvg] = useState<{
    color: string;
    label: string;
    data: number[];
  }>({ color: "", label: "", data: [] });

  const fetchStatistics = async () => {
    try {
      const fetchedData = await getStatistics();
      setStatisticsData(fetchedData);
      console.log("fetchedData", fetchedData);
      processSeriesData(fetchedData);
      processPerformanceData(fetchedData);
      processPPerformanceSumData(fetchedData);
      setAvg(getAvg(fetchedData.total[0]));
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

  const processPPerformanceSumData = (data: StatisticsData) => {
    if (!data || !data.data) return;

    const performanceSum = [
      {
        count: data.total[0].totalPostCount,
        title: "My Posts",
      },
      {
        count: data.total[0].totalLikeCount,
        title: "Likes",
      },
      {
        count: data.total[0].totalCommentCount,
        title: "Comments",
      },
      {
        count: data.total[0].totalViewCount,
        title: "Views",
      },
    ];

    setPerformanceSumData(performanceSum);
  };

  const processPerformanceData = (data: StatisticsData) => {
    if (!data || !data.data) return;

    const performance = [
      {
        color: "#02B2AF",
        label: "Comments",
        data: data.totalcommentcountbydaylist.map(
          (item) => Object.values(item)[0]
        ),
      },
      {
        color: "#72CCFF",
        label: "Likes",
        data: data.totallikecountbydaylist.map(
          (item) => Object.values(item)[0]
        ),
      },
    ];

    console.log("performance", performance);

    setPerformanceData(performance);
  };

  const getAvg = (
    data: TotalData
  ): { color: string; label: string; data: number[] } => {
    const avgData = [
      data.totalLikeCount + data.totalCommentCount,
      data.totalCommentCount / data.totalPostCount,
      data.totalLikeCount / data.totalPostCount,
      data.totalViewCount / data.totalPostCount,
      data.totalCommentCount /
        data.totalPostCount /
        (data.totalLikeCount + data.totalCommentCount),
      data.totalLikeCount /
        data.totalPostCount /
        (data.totalLikeCount + data.totalCommentCount),
    ];

    return {
      color: "#DA00FF",
      label: "Average",
      data: avgData,
    };
  };

  const setArrayData = (data: PostStatistics) => {
    const dataArr = [
      data.totalEngagement,
      data.commentCounts,
      data.likeCounts,
      data.viewCounts,
      data.engagementComment,
      data.engagementLike,
    ];

    return dataArr;
  };

  const processSeriesData = (data: StatisticsData) => {
    if (!data || !data.data) return;

    const mostCommentedPost = data.data.mostCommentedPost;
    const mostLikedPost = data.data.mostLikedPost;
    const mostEngagedPost = data.data.mostEngagedPost;
    const mostViewedPost = data.data.mostViewedPost;
    const highestCommentEngagementPost = data.data.highestCommentEngagementPost;
    const highestLikeEngagementPost = data.data.highestLikeEngagementPost;

    const commentData = setArrayData(mostCommentedPost);
    const likeData = setArrayData(mostLikedPost);
    const interactionData = setArrayData(mostEngagedPost);
    const viewData = setArrayData(mostViewedPost);
    const commentIntData = setArrayData(highestCommentEngagementPost);
    const likeIntData = setArrayData(highestLikeEngagementPost);

    const processedData = [
      {
        color: "#72CCFF",
        label: "Interaction",
        data: interactionData,
      },

      {
        color: "#72CCFF",
        label: "Comments",
        data: commentData,
      },

      {
        color: "#72CCFF",
        label: "Likes",
        data: likeData,
      },
      {
        color: "#72CCFF",
        label: "Views",
        data: viewData,
      },

      {
        color: "#72CCFF",
        label: "Comments/Int.",
        data: commentIntData,
      },

      {
        color: "#72CCFF",
        label: "Likes/Int.",
        data: likeIntData,
      },
    ];

    setSeriesData(processedData);
  };

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
          <PerformanceSumCard performacesumDatas={performanceSumData} />
          <Performance dataSeries={performanceData} />
          <SpecificPostsCard
            customCardsDetails={statisticsData}
            dataSeries={seriesData}
            avg={avg}
          />
        </>
      )}
    </MiniDrawer>
  );
}
