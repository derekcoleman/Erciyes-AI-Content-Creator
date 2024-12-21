"use client";
import SettingsForm from "@/components/forms/SettingsForm";
import { useState, useEffect } from "react";
import { Settings } from "@/lib/types";
import { getSettings } from "@/lib/utils";
import PromptSettingsFrom from "@/components/forms/PromptSettingsFrom";
import WordSettingsForm from "@/components/forms/WordSettingsForm";
import { Modal, Box, Fade, Backdrop } from "@mui/material";

interface SettingsModalProps {
  endpoint: string;
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  endpoint,
}) => {
  const [settingsData, setSettingsData] = useState<Settings>({
    topic: "Osmanlı Tarihi",
    language: "Türkçe",
    code: 200,
    status: true,
    message: "Message",
  });
  const [loading, setLoading] = useState<boolean>(true);

  //Get isteği klakacak sayfalara yüklenecek bu görev
  //post isteği eklenmeli ve gelen statusx code ile üst katmtna bildirip bir ok ise bir daha get atılmalı

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const fetchedSettings = await getSettings(endpoint);
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
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
            width: "80%",
            height: "80%",
            overflowY: "scroll",
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <SettingsForm
            topicData={settingsData.topic}
            languageData={settingsData.language}
            statusData={settingsData.status || loading}
          />
          <PromptSettingsFrom
            selectedInteractionsData={[]}
            moodData=""
            customTopicData=""
          />
          <WordSettingsForm customInteractionData={[""]} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
