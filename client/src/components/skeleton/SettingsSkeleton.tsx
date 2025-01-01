import { Grid, Skeleton } from "@mui/material";
import React from "react";

function SettingsSkeleton() {
  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "95vw",
            height: "20vh",
            paddingBottom: 6,
            paddingTop: 2,
            margin: 2,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "95vw",
            height: "20vh",
            paddingBottom: 6,
            paddingTop: 2,
            margin: 2,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "95vw",
            height: "20vh",
            paddingBottom: 6,
            paddingTop: 2,
            margin: 2,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default SettingsSkeleton;
