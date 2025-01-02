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
import CustomCard from "./CustomCard";
import { SpecificCustomCard, specificHeaders } from "@/lib/types";
import { spesificPostCardFilters } from "@/lib/conts";

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
            <CustomCard
              isShared={0}
              id={card.id}
              key={index}
              platform={card.platform}
              postImage={card.postImage}
              title={card.title}
              content={card.content}
              hashtags={card.hashtags}
              likes={card.likes}
              comments={card.comments}
              date={card.date}
              isInnerCard={true}
            />
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
