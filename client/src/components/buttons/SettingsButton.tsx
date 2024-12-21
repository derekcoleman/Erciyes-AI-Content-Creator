import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import SettingsModal from "../card/SettingsModal";

interface SettingsButtonProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  endpoint: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
  onClick,
  open,
  onClose,
  endpoint,
}) => {
  return (
    <>
      <IconButton aria-label="settings" onClick={onClick}>
        <SettingsIcon />
      </IconButton>
      <SettingsModal
        open={open}
        onClose={onClose}
        endpoint={endpoint}
      ></SettingsModal>
    </>
  );
};

export default SettingsButton;
