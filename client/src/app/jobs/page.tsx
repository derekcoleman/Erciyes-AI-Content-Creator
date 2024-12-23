"use client";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import JobForm from "@/components/forms/JobsForm";
import JobComponent from "@/components/card/JobComponent";
import { DUMMYJOBS } from "@/lib/conts";
import { Alert, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  JobData,
  PromptSettingsInfo,
  Settings,
  SettingsFormData,
  SettingsInfo,
  WordSettingsInfo,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { addSettings, getJobs, getSettings, jobToJobData } from "@/lib/utils";
import { settingsAtom } from "@/store";
import { useAtom } from "jotai";

export default function JobPage() {
  const [settingsData, setSettingsData] = useAtom(settingsAtom);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const fetchedSettings = await getSettings();
      if (fetchedSettings.status) {
        setSettingsData(fetchedSettings);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const fetchedJobs = jobToJobData(await getJobs());
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    }
  };

  const updateSettingsData = (newSettings: Settings) => {
    setSettingsData(newSettings);
  };

  const handlePromptFormSubmit = async (
    updatedPromptData: PromptSettingsInfo
  ) => {
    updateSettingsData({
      ...settingsData,
      customTopic: updatedPromptData.customTopic,
      mood: updatedPromptData.mood,
      selectedInteractions: updatedPromptData.selectedInteractions,
    });
    await handleSubmit();
  };

  const handleWordFormSubmit = async (updatedWordData: WordSettingsInfo) => {
    updateSettingsData({
      ...settingsData,
      bannedWords: updatedWordData.bannedWords,
      wantedWords: updatedWordData.wantedWords,
    });
    await handleSubmit();
  };

  const handleSubmit = async (): Promise<boolean> => {
    try {
      const {
        language,
        topic,
        wantedWords,
        bannedWords,
        customTopic,
        mood,
        selectedInteractions,
      } = settingsData;

      const formData: SettingsFormData = {
        language,
        topic,
        wantedWords,
        bannedWords,
        customTopic,
        mood,
        selectedInteractions,
      };

      const settingsInfo = await addSettings(formData);

      if (settingsInfo.status) {
        console.log("Settings updated successfully:", settingsInfo);
        return settingsInfo.status;
      } else {
        alert("Settings failed: " + settingsInfo.message);
        return settingsInfo.status;
      }
    } catch (error) {
      alert("Settings failed: " + (error as Error).message);
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchJobs();
  }, [settingsData, jobs]);

  return (
    <MiniDrawer>
      <JobForm
        settingsData={{
          promptSettingsInfo: {
            selectedInteractions: settingsData.selectedInteractions || [],
            mood: settingsData.mood || "",
            customTopic: settingsData.customTopic || "",
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
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {jobs.map((job, index) => (
            <Grid item xs={6} key={index}>
              <JobComponent
                title={job.title}
                platform={job.platform}
                days={job.day}
                hour={job.hour}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </MiniDrawer>
  );
}
