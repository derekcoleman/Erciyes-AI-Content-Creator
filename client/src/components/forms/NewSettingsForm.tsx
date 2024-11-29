import { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { addSettings } from "@/lib/utils";
import { SettingsInfo } from "@/lib/types";
import { useAtom } from "jotai";
import { themeAtom } from "@/store";

const themes = ["Light", "Dark"];
const notificationOptions = ["Enabled", "Disabled"];

interface NewSettingsFormProps {
  notificationsData: string;
}

const NewSettingsForm: React.FC<NewSettingsFormProps> = ({
  notificationsData = "Enabled",
}) => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [newTheme, setNewTheme] = useState(theme);
  const [notifications, setNotifications] = useState(notificationsData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      try {
        const settingsInfo: SettingsInfo = await addSettings({
          theme,
          notifications,
        });
        if (settingsInfo.status) {
          console.log(settingsInfo);
        } else {
          alert("Settings update failed: " + settingsInfo.message);
        }
      } catch (error) {
        alert("Settings update failed: " + error.message);
      }
    }
  };

  const isFormValid = () => {
    return theme && notifications;
  };

  const toggleTheme = () => {
    const updateTheme = newTheme === "Dark" ? "Dark" : "Light";
    setTheme(updateTheme);
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
        Tema ve Bildirim Ayarları
      </Typography>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <Select
            value={newTheme}
            onChange={(e) => setNewTheme(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "gray" }}>Tema Seçimi</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="" disabled>
              Tema Seçimi
            </MenuItem>
            {themes.map((themeOption) => (
              <MenuItem key={themeOption} value={themeOption}>
                {themeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ width: "30%" }}>
          <Select
            value={notifications}
            onChange={(e) => setNotifications(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "gray" }}>Bildirim Seçimi</span>;
              }
              return selected;
            }}
          >
            <MenuItem value="" disabled>
              Bildirim Seçimi
            </MenuItem>
            {notificationOptions.map((notificationOption) => (
              <MenuItem key={notificationOption} value={notificationOption}>
                {notificationOption}
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
          onClick={toggleTheme}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default NewSettingsForm;
