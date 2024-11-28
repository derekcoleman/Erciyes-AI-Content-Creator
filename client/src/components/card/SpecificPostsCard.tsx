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

const DUMMYDATAS = [
  "Interaction",
  "Comment",
  "Like",
  "Comments Compared to Interaction",
  "Like compared to Interaction",
];

const avg = { label: "Average", data: [3, 4, 2, 1, 3] };
const ALL_SERIES = [
  {
    color: "#DA00FF",
    label: "Interaction",
    data: [10, 5, 8, 4, 3],
  },

  {
    color: "#DA00FF",
    label: "Comment",
    data: [2, 6, 2, 4, 1],
  },

  {
    color: "#DA00FF",
    label: "Like",
    data: [8, 5, 9, 4, 3],
  },

  {
    color: "#DA00FF",
    label: "Comments Compared to Interaction",
    data: [3, 3, 5, 2, 1],
  },

  {
    color: "#DA00FF",
    label: "Like compared to Interaction",
    data: [3, 4, 5, 2, 5],
  },
];

const SpecificPostsCard = () => {
  const [filter, setFilter] = useState(DUMMYDATAS[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const filterSeries = (filter: string, series: typeof ALL_SERIES) => {
    return series.filter((item) => item.label === filter);
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
          filters={DUMMYDATAS}
        />
      </Box>
      <CardContent
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <Box
          sx={{
            width: "90%",
          }}
        >
          <BarChart
            yAxis={[{ scaleType: "band", data: DUMMYDATAS }]}
            series={[...filterSeries(filter, ALL_SERIES), avg]}
            height={500}
            layout="horizontal"
            margin={{ top: 50, right: 200, left: 210 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpecificPostsCard;
