"use client";
import SettingsForm from "@/components/forms/SettingsForm";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import { useEffect, useState } from "react";
import {
  addSettings,
  getSettings,
  transformSettingsFromBackend,
  transformSettingsToBackend,
} from "@/lib/utils";
import PromptSettingsFrom from "@/components/forms/PromptSettingsFrom";
import WordSettingsForm from "@/components/forms/WordSettingsForm";
import { settingsAtom } from "@/store";
import { useAtom } from "jotai";
import {
  PromptSettingsInfo,
  Settings,
  SettingsFormData,
  WordSettingsInfo,
} from "@/lib/types";
import { Alert } from "@mui/material";
import SettingsSkeleton from "@/components/skeleton/SettingsSkeleton";

export default function SettingsPage() {
  const [settingsData, setSettingsData] = useAtom(settingsAtom);
  const [isNoSettings, setIsNoSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSettings = async () => {
    try {
      const fetchedSettings = await getSettings();
      if (fetchedSettings.status) {
        const transformedSettings =
          transformSettingsFromBackend(fetchedSettings);
        setSettingsData(transformedSettings);
        setIsNoSettings(transformedSettings.topic === undefined);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

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

  return (
    <MiniDrawer>
      {isNoSettings && (
        <Alert sx={{ marginTop: 5 }} severity="warning">
          You must set your settings before you can use the app.
        </Alert>
      )}
      {loading ? (
        <SettingsSkeleton />
      ) : (
        <>
          <SettingsForm
            stateData={settingsData}
            onSettingsSubmit={updateSettingsData}
            isDisabled={
              settingsData.language !== undefined ||
              settingsData.topic !== undefined ||
              settingsData.disabled ||
              false
            }
          />
          <PromptSettingsFrom
            selectedInteractionsData={settingsData.selectedInteractions || []}
            moodData={settingsData.mood || ""}
            sub_topic={settingsData.sub_topic || ""}
            onFormSubmit={handlePromptFormSubmit}
          />
          <WordSettingsForm
            bannedWords={settingsData.bannedWords || []}
            wantedWords={settingsData.wantedWords || []}
            onFormSubmit={handleWordFormSubmit}
          />
        </>
      )}
    </MiniDrawer>
  );
}
