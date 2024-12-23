"use client";
import SettingsForm from "@/components/forms/SettingsForm";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import { useEffect } from "react";
import { addSettings, getSettings } from "@/lib/utils";
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

export default function SettingsPage() {
  const [settingsData, setSettingsData] = useAtom(settingsAtom);

  useEffect(() => {
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

    fetchSettings();
  }, []);

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

  return (
    <MiniDrawer>
      <SettingsForm
        stateData={settingsData}
        onSettingsSubmit={updateSettingsData}
        isDisabled={
          (settingsData.language.length > 0 && settingsData.topic.length > 0) ||
          settingsData.disabled ||
          false
        }
      />
      <PromptSettingsFrom
        selectedInteractionsData={settingsData.selectedInteractions || []}
        moodData={settingsData.mood || ""}
        customTopicData={settingsData.customTopic || ""}
        onFormSubmit={handlePromptFormSubmit}
      />
      <WordSettingsForm
        bannedWords={settingsData.bannedWords || []}
        wantedWords={settingsData.wantedWords || []}
        onFormSubmit={handleWordFormSubmit}
      />
    </MiniDrawer>
  );
}
