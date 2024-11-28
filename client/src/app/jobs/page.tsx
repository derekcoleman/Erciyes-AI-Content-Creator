"use client";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import JobForm from "@/components/forms/JobsForm";
import Job from "@/components/card/Job";
import { DUMMYJOBS } from "@/lib/conts";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function JobPage() {
  //Get all jobs for current user

  return (
    <MiniDrawer>
      <JobForm />
      <Divider sx={{ fontSize: "20px" }}>Görevler</Divider>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Mapping through the job list */}
        {DUMMYJOBS.map((job, index) => (
          <Grid item xs={6} key={index}>
            <Job
              title={job.title}
              platform={job.platform}
              days={job.days}
              hour={job.hour}
            />
          </Grid>
        ))}
      </Grid>
    </MiniDrawer>
  );
}
