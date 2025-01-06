"use client";
import HomeSkeleton from "@/components/skeleton/HomeSkeleton";
import MiniDrawer from "../components/drawer/MiniDrawer";
import { Alert, Box, Button, Grid, Tooltip } from "@mui/material";
import CustomCard from "@/components/card/CustomCard";
import { useEffect, useState } from "react";
import {
  addSettings,
  getHome,
  getPostWithAI,
  getProfile,
  getSettings,
  transformSettingsFromBackend,
  transformSettingsToBackend,
} from "@/lib/utils";
import {
  Post_Backend,
  PromptSettingsInfo,
  Settings,
  SettingsFormData,
  WordSettingsInfo,
} from "@/lib/types";
import SettingsButton from "@/components/buttons/SettingsButton";
import { settingsAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const [postDatas, setPostDatas] = useState<Post_Backend>();
  const [loading, setLoading] = useState<boolean>(true);
  const [newPostLoading, setNewPostLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [settingsData, setSettingsData] = useAtom(settingsAtom);
  const [loadProfile, setLoadProfile] = useState<boolean>(false);

  const router = useRouter();

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
        console.log("asdasd", fetchedSettings.topic, fetchedSettings.language);
        if (!fetchedSettings.topic || !fetchedSettings.language) {
          router.push("/settings");
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchHome();
    fetchSettings();
    fetchProfile();
  }, []);

  const updatePostData = (deletedPostID: number) => {
    setPostDatas((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: prev.posts.filter((post) => post.id !== deletedPostID),
      };
    });
  };
  const updateSettingsData = (newSettings: Settings) => {
    setSettingsData(newSettings);
  };

  const fetchPosts = async () => {
    setNewPostLoading(true);
    try {
      const fetchedPost = await getPostWithAI();

      const newPost = {
        id: fetchedPost.post_id,
        user_id: fetchedPost.post.user_id,
        title: fetchedPost.post.title,
        body: fetchedPost.post.body,
        status: 0,
        created_at: new Date().toISOString(),
      };

      setPostDatas((prev) => {
        if (!prev) {
          return {
            code: fetchedPost.code,
            message: fetchedPost.message,
            status: fetchedPost.status,
            posts: [newPost],
          };
        }

        return {
          ...prev,
          posts: [newPost, ...prev.posts],
        };
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setNewPostLoading(false);
    }
  };

  const fetchHome = async () => {
    try {
      const fetchedPost = await getHome();
      setPostDatas(fetchedPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
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
      const settingsInfo = await addSettings(
        transformSettingsToBackend(formData)
      );

      if (settingsInfo.status) {
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

  const handleClick = () => {
    fetchPosts();
  };

  const handleClickModalButton = () => {
    setOpen(true);
  };

  const handleCloseModalButton = () => {
    setOpen(false);
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    setPostDatas((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: prev.posts.map((post) =>
          post.id === id ? { ...post, title: newTitle } : post
        ),
      };
    });
  };

  const handleBodyChange = (id: number, newBody: string) => {
    setPostDatas((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        posts: prev.posts.map((post) =>
          post.id === id ? { ...post, body: newBody } : post
        ),
      };
    });
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
              sub_topic: settingsData.sub_topic || "",
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

        <Tooltip
          title={
            !loadProfile ? "Profil Bilgilerinden API Anahtarı girilmeli" : ""
          }
          arrow
        >
          <span>
            <Button
              disabled={!loadProfile}
              onClick={handleClick}
              variant="contained"
            >
              Anında OLUŞTUR
            </Button>
          </span>
        </Tooltip>
      </Box>

      {loading ? (
        <HomeSkeleton />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : postDatas && postDatas.posts.length !== 0 ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={5} mb={2}>
            {newPostLoading && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              />
            )}
          </Grid>

          <Grid container spacing={2}>
            {postDatas.posts.map((post) => (
              <Grid item xs={6} sm={4} md={4} key={post.id}>
                <CustomCard
                  id={post.id}
                  platform="Topix"
                  postImage="/NoImgLightNew.jpg"
                  title={post.title}
                  content={post.body}
                  hashtags={post.tags || []}
                  likes={20}
                  comments={8}
                  date={post.created_at}
                  isShared={post.status || 0}
                  onTitleChange={handleTitleChange}
                  onContentChange={handleBodyChange}
                  onDeletePost={updatePostData}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Alert sx={{ marginTop: 5 }} severity="info">
          No posts available 😴
        </Alert>
      )}
    </MiniDrawer>
  );
}
