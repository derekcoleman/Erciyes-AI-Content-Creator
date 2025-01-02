import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import SettingsModal from "../card/SettingsModal";
import { PromptSettingsInfo, WordSettingsInfo } from "@/lib/types";

interface SettingsButtonProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  settingsData: {
    promptSettingsInfo: PromptSettingsInfo;
    wordSettingsInfo: WordSettingsInfo;
  };
  onPromptFormSubmit?: (data: PromptSettingsInfo) => void;
  onWordFormSubmit?: (data: WordSettingsInfo) => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  onClick,
  open,
  onClose,
  settingsData,
  onPromptFormSubmit,
  onWordFormSubmit,
}) => {
  return (
    <>
      <IconButton aria-label="settings" onClick={onClick}>
        <SettingsIcon />
      </IconButton>
      <SettingsModal
        open={open}
        onClose={onClose}
        settingsData={settingsData}
        onPromptFormSubmit={onPromptFormSubmit}
        onWordFormSubmit={onWordFormSubmit}
      ></SettingsModal>
    </>
  );
};

export default SettingsButton;
