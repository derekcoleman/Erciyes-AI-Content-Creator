import { Grid, Skeleton } from "@mui/material";
import React from "react";

function HomeSkeleton() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" height={300} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <Skeleton variant="rectangular" height={200} />
      </Grid>
    </Grid>
  );
}

export default HomeSkeleton;
