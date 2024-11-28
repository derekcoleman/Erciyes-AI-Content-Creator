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

const DUMMYDATAS = ["Comments", "Likes", "Followers"];

const Performance = () => {
  const [filter, setFilter] = useState(DUMMYDATAS[0]);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
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
      <CardContent></CardContent>
    </Card>
  );
};

export default Performance;
