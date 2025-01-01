"use client";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import JobForm from "@/components/forms/JobsForm";
import JobComponent from "@/components/card/JobComponent";
import { Alert, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  Job,
  JobData,
  PromptSettingsInfo,
  Settings,
  SettingsFormData,
  WordSettingsInfo,
} from "@/lib/types";
import { useEffect, useState } from "react";
import {
  addSettings,
  getJobs,
  getSettings,
  jobToJobData,
  transformSettingsFromBackend,
  transformSettingsToBackend,
} from "@/lib/utils";
import { settingsAtom } from "@/store";
import { useAtom } from "jotai";

export default function JobPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [settingsData, setSettingsData] = useAtom(settingsAtom);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const fetchedSettings = await getSettings();
      if (fetchedSettings.status) {
        const transformedSettings =
          transformSettingsFromBackend(fetchedSettings);
        setSettingsData(transformedSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
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

  const updateSettingsData = (newSettings: Settings) => {
    setSettingsData(newSettings);
  };

  const handlePromptFormSubmit = async (
    updatedPromptData: PromptSettingsInfo
  ) => {
    const formData: SettingsFormData = {
      language: settingsData.language,
      topic: settingsData.topic,
      wantedWords: settingsData.wantedWords,
      bannedWords: settingsData.bannedWords,
      sub_topic: updatedPromptData.sub_topic,
      mood: updatedPromptData.mood,
      selectedInteractions: updatedPromptData.selectedInteractions,
    };

    const success = await handleSubmit(formData);

    if (success) {
      updateSettingsData({
        ...settingsData,
        sub_topic: updatedPromptData.sub_topic,
        mood: updatedPromptData.mood,
        selectedInteractions: updatedPromptData.selectedInteractions,
      });
    }
  };

  const handleWordFormSubmit = async (updatedWordData: WordSettingsInfo) => {
    const formData: SettingsFormData = {
      language: settingsData.language,
      topic: settingsData.topic,
      wantedWords: updatedWordData.wantedWords,
      bannedWords: updatedWordData.bannedWords,
      sub_topic: settingsData.sub_topic,
      mood: settingsData.mood,
      selectedInteractions: settingsData.selectedInteractions,
    };

    const success = await handleSubmit(formData);
    if (success) {
      updateSettingsData({
        ...settingsData,
        bannedWords: updatedWordData.bannedWords,
        wantedWords: updatedWordData.wantedWords,
      });
    }
  };
  const handleSubmit = async (formData: SettingsFormData): Promise<boolean> => {
    try {
      console.log("Form data:", formData);
      const settingsInfo = await addSettings(
        transformSettingsToBackend(formData)
      );

      if (settingsInfo.status) {
        console.log("Settings updated successfully:", settingsInfo);
        return true;
      } else {
        alert("Settings failed: " + settingsInfo.message);
        return false;
      }
    } catch (error) {
      alert("Settings failed: " + (error as Error).message);
      return false;
    }
  };

  const handleJobAdded = (newJob: Job) => {
    const jData = jobToJobData([newJob]);
    setJobs((prevJobs) => [...prevJobs, jData[0]]);
  };

  useEffect(() => {
    fetchSettings();
    fetchJobs();
  }, []);

  const deleteJob = async () => {
    // try {
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || "Failed to delete job");
    //   }
    //   setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    // } catch (error) {
    //   console.error("Error deleting job:", error);
    //   alert("Error deleting job: " + (error as Error).message);
    // }
  };

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
        onPromptFormSubmit={handlePromptFormSubmit}
        onWordFormSubmit={handleWordFormSubmit}
      />
      <Divider sx={{ fontSize: "20px" }}>Görevler</Divider>
      {loading ? (
        <Alert sx={{ marginTop: 5 }} severity="info">
          {"Loading..."}
        </Alert>
      ) : error ? (
        <Alert severity="error">{"Something went wrong"}</Alert>
      ) : jobs.length !== 0 ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {jobs.map((job, index) => (
            <Grid item xs={6} key={index}>
              <JobComponent
                title={job.title}
                platform={job.platform}
                days={job.day}
                hour={job.hour}
                onDelete={deleteJob}
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
