"use client";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import JobForm from "@/components/forms/JobsForm";
import Job from "@/components/jobs/Job";
import Divider from "@mui/material/Divider";

export default function JobPage() {
  //Get all jobs for current user

  return (
    <MiniDrawer>
      <JobForm />
      <Divider sx={{ fontSize: "20px" }}>Görevler</Divider>
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
