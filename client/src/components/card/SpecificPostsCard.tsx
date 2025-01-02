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
import { SpecificCustomCard, specificHeaders } from "@/lib/types";
import { spesificPostCardFilters } from "@/lib/conts";
import StatisticsDataCard from "./StatisticsDataCard";

interface SpecificPostsCardProps {
  customCardsDetails: SpecificCustomCard[];
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

  const filteredCards = customCardsDetails.filter(
    (card) =>
      card.specificHeader ===
      specificHeaders[filter as keyof typeof specificHeaders]
  );

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
          {filteredCards.map((card, index) => (
            <Box key={index} sx={{ width: "40%" }}>
              <StatisticsDataCard
                postImage={"/NoImgLightNew.jpg"}
                title={card.title}
                content={card.content}
                hashtags={card.hashtags}
                likes={card.likes}
                comments={card.comments}
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
