import { Grid, Skeleton } from "@mui/material";
import React from "react";

function HomeSkeleton() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={5} mb={2}>
        <Skeleton
          variant="rectangular"
          height={"230px"}
          sx={{ maxWidth: "736.5px" }}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={4}>
          <Skeleton
            variant="rectangular"
            height={"230px"}
            sx={{ maxWidth: "591.33px" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeSkeleton;
