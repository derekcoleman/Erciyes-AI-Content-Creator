"use client";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import CardFilter from "../filter/CardFilter";
import { BarChart } from "@mui/x-charts";
import { specificHeaders, StatisticsData } from "@/lib/types";
import { spesificPostCardFilters } from "@/lib/conts";
import StatisticsDataCard from "./StatisticsDataCard";

interface SpecificPostsCardProps {
  customCardsDetails?: StatisticsData;
  dataSeries: { color: string; label: string; data: number[] }[];
  avg: { color: string; label: string; data: number[] };
}

const SpecificPostsCard: React.FC<SpecificPostsCardProps> = ({
  customCardsDetails,
  dataSeries,
  avg,
}) => {
  const [filter, setFilter] = useState(spesificPostCardFilters[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const filterSeries = (filter: string, series: typeof dataSeries) => {
    return series.filter((item) => item.label === filter);
  };

  const filteredCards = (specificHeader: specificHeaders) => {
    const data = customCardsDetails?.data;

    if (!data) return [];

    switch (specificHeader) {
      case specificHeaders.Likes:
        return [data.mostLikedPost];
      case specificHeaders.Comments:
        return [data.mostCommentedPost];
      case specificHeaders.Interaction:
        return [data.mostEngagedPost];
      case specificHeaders.Views:
        return [data.mostViewedPost];
      case specificHeaders["Comments/Int."]:
        return [data.highestCommentEngagementPost];
      case specificHeaders["Likes/Int."]:
        return [data.highestLikeEngagementPost];
      default:
        return [];
    }
  };

  return (
    <Card component="form" sx={{ margin: 2, width: "96.5%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 2,
        }}
      >
        <CardHeader title={"POST"} />
        <CardFilter
          filterState={filter}
          handleChange={handleChange}
          filters={spesificPostCardFilters}
        />
      </Box>
      <CardContent
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {filteredCards(specificHeaders[filter]).map((card, index) => (
            <Box key={index} sx={{ width: "40%" }}>
              <StatisticsDataCard
                postImage={"/NoImgLightNew.jpg"}
                title={card.title}
                content={card.body}
                hashtags={card.hashtags}
                likes={card.likeCounts}
                comments={card.commentCounts}
                date={card.date}
              />
            </Box>
          ))}
          <Box sx={{ width: "40%" }}>
            <BarChart
              xAxis={[{ scaleType: "band", data: spesificPostCardFilters }]}
              series={[...filterSeries(filter, dataSeries), avg]}
              height={300}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpecificPostsCard;
