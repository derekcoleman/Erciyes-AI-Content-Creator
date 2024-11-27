"use client";
import SettingsForm from "@/components/forms/SettingsForm";
import MiniDrawer from "../../components/drawer/MiniDrawer";
import { useState, useEffect } from "react";
import { Settings } from "@/lib/types";
import { getSettings } from "@/lib/utils";
import NewSettingsForm from "@/components/forms/NewSettingsForm";
import { useAtom } from "jotai";
import { themeAtom } from "@/store";

export default function SettingsPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [settingsData, setSettingsData] = useState<Settings>({
    topic: "Osmanlı Tarihi",
    language: "Türkçe",
    code: 200,
    status: true,
    message: "Message",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const fetchedSettings = await getSettings();
        setSettingsData(fetchedSettings);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <MiniDrawer>
      <SettingsForm
        topicData={settingsData.topic}
        languageData={settingsData.language}
        statusData={settingsData.status || loading}
      />
      <NewSettingsForm themeData={theme} notificationsData="Enabled" />
    </MiniDrawer>
  );
}
