import { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addSettings } from "@/lib/utils";
import { Settings, SettingsInfo } from "@/lib/types";

const languages = ["English", "Turkish", "Spanish", "French", "German"];

interface SettingsFormProps {
  stateData: Settings;
  onSettingsSubmit: (updatedSettings: Settings) => void;
  isDisabled: boolean;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  stateData,
  onSettingsSubmit,
  isDisabled,
}) => {
  const [settingsData, setSettingsData] = useState(stateData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      try {
        const fetchInfo: SettingsInfo = await addSettings({
          topic: settingsData.topic,
          language: settingsData.language,
          wantedWords: settingsData.wantedWords,
          bannedWords: settingsData.bannedWords,
          customTopic: settingsData.customTopic,
          mood: settingsData.mood,
          selectedInteractions: settingsData.selectedInteractions,
        });
        if (fetchInfo.status) {
          setSettingsData((prev) => ({ ...prev, disabled: true }));
          onSettingsSubmit(settingsData);
        }
      } catch (error) {
        console.error("settings failed: ", error);
      }
    }
    return;
  };

  const isFormValid = settingsData.topic && settingsData.language;

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        paddingBottom: 6,
        paddingTop: 2,
        margin: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Ayarlar
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <TextField
            onChange={(e) =>
              setSettingsData((prev) => ({ ...prev, topic: e.target.value }))
            }
            id="outlined-basic"
            placeholder="Genel Başlık"
            variant="outlined"
            disabled={isDisabled || settingsData.disabled}
            value={settingsData.topic}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <Select
            disabled={isDisabled || settingsData.disabled}
            value={settingsData.language}
            onChange={(e) =>
              setSettingsData((prev) => ({ ...prev, language: e.target.value }))
            }
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "gray" }}>Dil Seçimi</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="" disabled>
              Dil Seçimi
            </MenuItem>
            {languages.map((languageOption) => (
              <MenuItem key={languageOption} value={languageOption}>
                {languageOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "10%", height: "56px", marginTop: "14px" }}
          disabled={!isFormValid || isDisabled || settingsData.disabled}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default SettingsForm;
