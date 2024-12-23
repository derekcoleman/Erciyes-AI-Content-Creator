"use client";
import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import MiniDrawer from "../components/drawer/MiniDrawer";
import { Alert, Box, Button, Grid } from "@mui/material";
import CustomCard from "@/components/card/CustomCard";
import React, { useEffect, useState } from "react";
import { addSettings, getHome, getPosts, getSettings } from "@/lib/utils";
import {
  Post,
  PromptSettingsInfo,
  Settings,
  SettingsFormData,
  WordSettingsInfo,
} from "@/lib/types";
import { DUMMYPOSTS } from "@/lib/conts";
import SettingsButton from "@/components/buttons/SettingsButton";
import { settingsAtom } from "@/store";
import { useAtom } from "jotai";

export default function HomePage() {
  const [postDatas, setPostDatas] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [settingsData, setSettingsData] = useAtom(settingsAtom);

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

  useEffect(() => {
    fetchSettings();
    fetchHome();
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

  const fetchPosts = async () => {
    try {
      const fetchedPost = await getPosts();
      setPostDatas((prev) => [...prev, fetchedPost]);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHome = async () => {
    try {
      const fetchedPost = await getHome();
      setPostDatas(fetchedPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    }
    //Backend yokken hata almamak için
    // finally {
    //   setLoading(false);
    // }
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

  const handleClick = () => {
    console.log("click");
    fetchPosts();
  };

  const handleClickModalButton = () => {
    setOpen(true);
  };

  const handleCloseModalButton = () => {
    setOpen(false);
  };

  return (
    <MiniDrawer>
      <Box>
        <SettingsButton
          onClick={handleClickModalButton}
          open={open}
          onClose={handleCloseModalButton}
          settingsData={{
            promptSettingsInfo: {
              customTopic: settingsData.customTopic || "",
              mood: settingsData.mood || "",
              selectedInteractions: settingsData.selectedInteractions || [],
            },
            wordSettingsInfo: {
              bannedWords: settingsData.bannedWords || [],
              wantedWords: settingsData.wantedWords || [],
            },
          }}
          onPromptFormSubmit={handlePromptFormSubmit}
          onWordFormSubmit={handleWordFormSubmit}
        />

        <Button onClick={handleClick} variant="contained">
          OLUŞTUR
        </Button>
      </Box>

      {loading ? (
        <HomeSkeleton />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={5} mb={2}>
            <CustomCard
              platform="Topix"
              postImage="/Gradient.png"
              title={postDatas[0].post.title}
              content={postDatas[0].post.body}
              hashtags={["tag3", "tag4"]}
              likes={20}
              comments={8}
              date="2024-10-28T15:00:00Z"
            />
          </Grid>

          <Grid container spacing={2}>
            {postDatas.slice(1).map((post, index) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CustomCard
                  platform="Topix"
                  postImage="/Gradient.png"
                  title={post.post.title}
                  content={post.post.body}
                  hashtags={["tag3", "tag4"]}
                  likes={20}
                  comments={8}
                  date="2024-10-28T15:00:00Z"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </MiniDrawer>
  );
}
