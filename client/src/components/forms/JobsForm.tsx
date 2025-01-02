import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { daysOfWeek, platforms } from "@/lib/conts";
import CustomTimePicker from "../inputs/CustomTimePicker";
import {
  addJobs,
  getHourFromDate,
  jobDataParser,
  transformSettingsToBackend,
} from "@/lib/utils";
import {
  Job,
  JobsFormData,
  PromptSettingsInfo,
  WordSettingsInfo,
} from "@/lib/types";
import SettingsButton from "../buttons/SettingsButton";

interface JobFormProps {
  settingsData: {
    promptSettingsInfo: PromptSettingsInfo;
    wordSettingsInfo: WordSettingsInfo;
  };
  onPromptFormSubmit: (data: PromptSettingsInfo) => void;
  onWordFormSubmit: (data: WordSettingsInfo) => void;
  onJobAdded: (newJob: Job) => void;
}

const JobForm: React.FC<JobFormProps> = ({
  settingsData,
  onPromptFormSubmit,
  onWordFormSubmit,
  onJobAdded,
}) => {
  const [platform, setPlatform] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [hour, setHour] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickModalButton = () => {
    setOpen(true);
  };

  const handleCloseModalButton = () => {
    setOpen(false);
  };

  const handleDayChange = (event: React.FormEvent) => {
    const { value } = event.target;
    setSelectedDays(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const levo = transformSettingsToBackend({
      wantedWords: settingsData.wordSettingsInfo.wantedWords,
      bannedWords: settingsData.wordSettingsInfo.bannedWords,
      sub_topic: settingsData.promptSettingsInfo.sub_topic,
      mood: settingsData.promptSettingsInfo.mood,
      selectedInteractions:
        settingsData.promptSettingsInfo.selectedInteractions,
    });

    if (isFormValid) {
      try {
        const formData: JobsFormData = {
          platform,
          selectedDays,
          hour: getHourFromDate(hour.$d),
          sub_topic: levo.sub_topic,
          mood: levo.mood,
          like: levo.like,
          comment: levo.comment,
          interaction: levo.interaction,
          frequency: levo.frequency,
        };

        const jobs = jobDataParser(formData);
        for (const job of jobs) {
          try {
            const jobResponse = await addJobs(job);
            if (jobResponse.status) {
              onJobAdded({ id: jobResponse.id, ...job });
            } else {
              console.error("Failed to add job", jobResponse.message);
            }
          } catch (error) {
            console.error("Error adding job:", error);
          }
        }
      } catch (error) {
        alert("Error processing form: " + error);
      }
    }
  };

  const isFormValid = platform && selectedDays.length > 0 && hour !== null;

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{ paddingBottom: 6, paddingTop: 2, margin: 2 }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Yeni Görev
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center " }}>
        <FormControl sx={{ display: "flex", justifyContent: "center" }}>
          <SettingsButton
            onClick={handleClickModalButton}
            open={open}
            onClose={handleCloseModalButton}
            settingsData={settingsData}
            onPromptFormSubmit={onPromptFormSubmit}
            onWordFormSubmit={onWordFormSubmit}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" sx={{ width: "20%" }}>
          <Select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "gray" }}>Seçim yapın</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="" disabled>
              Seçim yapın
            </MenuItem>
            {platforms.map((pl) => (
              <MenuItem key={pl} value={pl}>
                {pl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <Select
            multiple
            value={selectedDays}
            onChange={handleDayChange}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span style={{ color: "gray" }}>Gün seçin</span>;
              }
              return selected
                .map((day) => daysOfWeek.find((d) => d.value === day)?.label)
                .join(", ");
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Gün seçin
            </MenuItem>
            {daysOfWeek.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                <Checkbox checked={selectedDays.indexOf(day.value) > -1} />
                <ListItemText primary={day.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CustomTimePicker value={hour} onChange={setHour} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "10%", height: "56px", marginTop: "14px" }}
          disabled={!isFormValid}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default JobForm;
