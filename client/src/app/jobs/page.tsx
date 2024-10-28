"use client";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import JobForm from "@/components/jobs/JobsForm";
import Job from "@/components/jobs/Job";
import Divider from "@mui/material/Divider";

export default function JobPage() {
  return (
    <MiniDrawer>
      <JobForm />
      <Divider sx={{ fontSize: "20px" }}>Jobs</Divider>
      <Job
        title={"Test Title"}
        platform={"Instagram"}
        days={["Pazartesi", "Salı", "Cuma"]}
        hour={"14.00"}
      />
      <Job
        title={"Test Title 2"}
        platform={"Linkedin"}
        days={["Pazartesi", "Çarşamba", "Cuma", "Pazar"]}
        hour={"17.00"}
      />
    </MiniDrawer>
  );
}
