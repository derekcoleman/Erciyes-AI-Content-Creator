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
import { LineChart } from "@mui/x-charts";

const DUMMYDATAS = ["All", "Comments", "Likes", "Followers"];
const ALL_SERIES = [
  {
    color: "#02B2AF",
    label: "Comments",
    data: [12, 42, 24, 42, 57, 7, 78, 4, 12, 3, 21, 34, 29, 61, 55],
  },
  {
    color: "#72CCFF",
    label: "Likes",
    data: [55, 23, 34, 67, 89, 4, 15, 36, 98, 41, 60, 22, 38, 53, 82],
  },
  {
    color: "#DA00FF",
    label: "Followers",
    data: [5, 100, 78, 65, 42, 11, 30, 60, 71, 81, 22, 53, 30, 19, 80],
  },
];

const Performance = () => {
  const [filter, setFilter] = useState(DUMMYDATAS[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const filterSeries = (filter: string, series: typeof ALL_SERIES) => {
    if (filter === "All") {
      return series;
    }
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
        <CardHeader title={"PERFORMANCE"} />
        <CardFilter
          filterState={filter}
          handleChange={handleChange}
          filters={DUMMYDATAS}
        />
      </Box>
      <CardContent>
        <LineChart
          xAxis={[
            { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
          ]}
          series={filterSeries(filter, ALL_SERIES)}
          sx={{ width: "100%" }}
          height={300}
        />
      </CardContent>
    </Card>
  );
};

export default Performance;
