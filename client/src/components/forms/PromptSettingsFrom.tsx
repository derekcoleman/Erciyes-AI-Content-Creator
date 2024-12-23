import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { PromptSettingsInfo } from "@/lib/types";
import { INTERACTIONLIST, moods } from "@/lib/conts";
import { useState } from "react";

interface PromptSettingsFromProps {
  customTopicData: string;
  moodData: string;
  selectedInteractionsData: string[];
  onFormSubmit?: (data: PromptSettingsInfo) => void;
}

const PromptSettingsFrom: React.FC<PromptSettingsFromProps> = ({
  customTopicData = "",
  moodData = "",
  selectedInteractionsData = [],
  onFormSubmit,
}) => {
  const [mood, setMood] = useState(moodData);
  const [customTopic, setCustomTopicData] = useState(customTopicData);
  const [selectedInteractions, setSelectedInteractions] = useState<string[]>(
    selectedInteractionsData
  );

  const handleChange = (event: SelectChangeEvent) => {
    setMood(event.target.value as string);
  };

  const handleInteractionChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedInteractions(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      try {
        const settingsInfo: PromptSettingsInfo = {
          customTopic,
          mood,
          selectedInteractions,
        };

        onFormSubmit(settingsInfo);
      } catch (error) {
        console.error("Settings update failed: ", error);
      }
    }
  };

  const isFormValid = () => {
    return customTopic || mood || selectedInteractions.length > 0;
  };

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
        Diğer Girdi Ayarları
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <FormControl fullWidth margin="normal" sx={{ width: "25%" }}>
          <TextField
            onChange={(e) => setCustomTopicData(e.target.value)}
            id="outlined-basic"
            placeholder="Alt Konu"
            variant="outlined"
            value={customTopic}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ width: "25%" }}>
          <InputLabel id="mood-select-label">Mood</InputLabel>
          <Select
            labelId="mood-select-label"
            id="mood-select"
            value={mood}
            label="Mood"
            onChange={handleChange}
          >
            {moods.map((mood, index) => (
              <MenuItem key={index} value={mood}>
                {mood === "" ? "Mood Yok" : mood}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ width: "25%" }}>
          <Select
            multiple
            value={selectedInteractions}
            onChange={handleInteractionChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span style={{ color: "gray" }}>Gözetim Seçimi</span>;
              }
              return selected.join(", ");
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Gözetimler
            </MenuItem>
            {INTERACTIONLIST.map((interaction, index) => (
              <MenuItem key={index} value={interaction}>
                <Checkbox
                  checked={selectedInteractions.indexOf(interaction) > -1}
                />
                <ListItemText primary={interaction} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "10%", height: "56px", marginTop: "14px" }}
          disabled={!isFormValid()}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default PromptSettingsFrom;
