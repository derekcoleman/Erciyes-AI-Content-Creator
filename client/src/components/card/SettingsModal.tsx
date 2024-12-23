"use client";
import { PromptSettingsInfo, WordSettingsInfo } from "@/lib/types";
import PromptSettingsFrom from "@/components/forms/PromptSettingsFrom";
import WordSettingsForm from "@/components/forms/WordSettingsForm";
import { Modal, Box, Fade, Backdrop } from "@mui/material";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  settingsData: {
    promptSettingsInfo: PromptSettingsInfo;
    wordSettingsInfo: WordSettingsInfo;
  };
  onPromptFormSubmit: (data: PromptSettingsInfo) => void;
  onWordFormSubmit: (data: WordSettingsInfo) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  settingsData,
  onPromptFormSubmit,
  onWordFormSubmit,
}) => {
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
            maxHeight: "80%",
            overflowY: "scroll",
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <PromptSettingsFrom
            selectedInteractionsData={
              settingsData.promptSettingsInfo.selectedInteractions
            }
            moodData={settingsData.promptSettingsInfo.mood}
            customTopicData={settingsData.promptSettingsInfo.customTopic}
            onFormSubmit={onPromptFormSubmit}
          />
          <WordSettingsForm
            bannedWords={settingsData.wordSettingsInfo.bannedWords}
            wantedWords={settingsData.wordSettingsInfo.wantedWords}
            onFormSubmit={onWordFormSubmit}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
