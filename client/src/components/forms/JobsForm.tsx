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
  SelectChangeEvent,
  Snackbar,
  Tooltip,
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
  onPromptFormSubmit?: (data: PromptSettingsInfo) => void;
  onWordFormSubmit?: (data: WordSettingsInfo) => void;
  onJobAdded: (newJob: Job) => void;
  isDisabled?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  settingsData,
  onJobAdded,
  isDisabled,
}) => {
  const [anyUpdate, setAnyUpdate] = useState<boolean>(false);
  const [platform, setPlatform] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [hour, setHour] = useState(null);
  const [open, setOpen] = useState(false);
  const [jobSettings, setJobSettings] = useState<{
    promptSettingsInfo: PromptSettingsInfo;
    wordSettingsInfo: WordSettingsInfo;
  }>(settingsData);

  const handlePromptFormSubmit = async (
    updatedPromptData: PromptSettingsInfo
  ) => {
    setJobSettings((prev) => {
      return { ...prev, promptSettingsInfo: updatedPromptData };
    });
    setAnyUpdate(true);
  };

  const handleWordFormSubmit = async (updatedWordData: WordSettingsInfo) => {
    setJobSettings((prev) => {
      return { ...prev, wordSettingsInfo: updatedWordData };
    });
    setAnyUpdate(true);
  };

  const handleClickModalButton = () => {
    setOpen(true);
  };

  const handleCloseModalButton = () => {
    setOpen(false);
  };

  const handleDayChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectedDays(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const levo = transformSettingsToBackend({
      wantedWords: jobSettings.wordSettingsInfo.wantedWords,
      bannedWords: jobSettings.wordSettingsInfo.bannedWords,
      sub_topic: jobSettings.promptSettingsInfo.sub_topic,
      mood: jobSettings.promptSettingsInfo.mood,
      selectedInteractions: jobSettings.promptSettingsInfo.selectedInteractions,
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
          bannedWords: levo.bannedWords,
          wantedWords: levo.wantedWords,
          gundem: levo.gundem,
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

  console.log("isdiabled", isDisabled);

  return (
    <Card component="form" sx={{ paddingBottom: 6, paddingTop: 2, margin: 2 }}>
      <Snackbar
        open={anyUpdate}
        autoHideDuration={5000}
        onClose={() => setAnyUpdate(false)}
        message="Ayarlarınız güncellendi"
      />
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Yeni Görev
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center " }}>
        <FormControl sx={{ display: "flex", justifyContent: "center" }}>
          <SettingsButton
            onClick={handleClickModalButton}
            open={open}
            onClose={handleCloseModalButton}
            settingsData={jobSettings}
            onPromptFormSubmit={handlePromptFormSubmit}
            onWordFormSubmit={handleWordFormSubmit}
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
              <MenuItem
                key={pl}
                value={pl}
                disabled={pl === "Instagram" || pl === "LinkedIn"}
              >
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
        <Tooltip
          title={
            isDisabled ? "Profil Bilgilerinden API Anahtarı girilmeli" : ""
          }
          arrow
        >
          <span style={{ width: "10%" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", height: "56px", marginTop: "14px" }}
              disabled={!isFormValid || isDisabled}
              onClick={handleSubmit}
            >
              İş Ekle
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default JobForm;
