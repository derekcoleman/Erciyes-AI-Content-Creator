"use client";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import JobForm from "@/components/forms/JobsForm";
import JobComponent from "@/components/card/JobComponent";
import { Alert, CircularProgress, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Job, JobData } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  deleteJob,
  getJobs,
  getProfile,
  getSettings,
  jobToJobData,
  transformSettingsFromBackend,
} from "@/lib/utils";
import { settingsAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function JobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSettings, setLoadingSettings] = useState<boolean>(true);
  const [settingsData, setSettingsData] = useAtom(settingsAtom);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadProfile, setLoadProfile] = useState<boolean>(false);

  const fetchProfile = async () => {
    try {
      const fetchedProfile = await getProfile();
      if (fetchedProfile.status) {
        if (fetchedProfile.topix_api_key) {
          setLoadProfile(true);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    }
  };

  const fetchSettings = async () => {
    try {
      const fetchedSettings = await getSettings();
      if (fetchedSettings.status) {
        const transformedSettings =
          transformSettingsFromBackend(fetchedSettings);
        setSettingsData(transformedSettings);
        if (!fetchedSettings.topic || !fetchedSettings.language) {
          router.push("/settings");
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoadingSettings(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const jDatas = await getJobs();
      const fetchedJobs = jobToJobData(jDatas.data);
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleJobAdded = (newJob: Job) => {
    const jData = jobToJobData([newJob]);
    setJobs((prevJobs) => [...prevJobs, jData[0]]);
  };

  useEffect(() => {
    fetchProfile();
    fetchSettings();
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId: number) => {
    try {
      const response = await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      setError((error as Error).message);
    }
  };

  if (loadingSettings || loading) {
    return (
      <MiniDrawer>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </MiniDrawer>
    );
  }

  return (
    <MiniDrawer>
      <JobForm
        onJobAdded={handleJobAdded}
        settingsData={{
          promptSettingsInfo: {
            selectedInteractions: settingsData.selectedInteractions || [],
            mood: settingsData.mood || "",
            sub_topic: settingsData.sub_topic || "",
          },
          wordSettingsInfo: {
            wantedWords: settingsData.wantedWords || [],
            bannedWords: settingsData.bannedWords || [],
          },
        }}
      />

      <Divider sx={{ fontSize: "20px" }}>Görevler</Divider>
      {error ? (
        <Alert severity="error">{"Something went wrong"}</Alert>
      ) : jobs.length !== 0 ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {jobs.map((job, index) => (
            <Grid item xs={6} key={index}>
              <JobComponent
                id={job.id}
                title={job.title}
                platform={job.platform}
                days={job.day}
                hour={job.hour}
                sub_topic={job.sub_topic}
                mood={job.mood}
                like={job.like}
                comment={job.comment}
                interaction={job.interaction}
                frequency={job.frequency}
                onDelete={handleDeleteJob}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert sx={{ marginTop: 5 }} severity="info">
          {"No jobs found"}
        </Alert>
      )}
    </MiniDrawer>
  );
}
