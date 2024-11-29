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
import { performanceFilters } from "@/lib/conts";

interface PerformaceProps {
  dataSeries: { color: string; label: string; data: number[] }[];
}

const Performance: React.FC<PerformaceProps> = ({ dataSeries }) => {
  const [filter, setFilter] = useState(performanceFilters[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const filterSeries = (filter: string, series: typeof dataSeries) => {
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
          filters={performanceFilters}
        />
      </Box>
      <CardContent>
        <LineChart
          xAxis={[
            { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
          ]}
          series={filterSeries(filter, dataSeries)}
          sx={{ width: "100%" }}
          height={300}
        />
      </CardContent>
    </Card>
  );
};

export default Performance;
