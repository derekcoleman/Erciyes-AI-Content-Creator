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
import CustomTimePicker from "../input/CustomTimePicker";
import { getHourFromDate } from "@/lib/utils";

const JobForm = () => {
  const [platform, setPlatform] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [hour, setHour] = useState(null);

  const handleDayChange = (event) => {
    const { value } = event.target;
    setSelectedDays(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ platform, selectedDays, hour: getHourFromDate(hour.$d) });
  };

  const isFormValid = () => {
    return platform && selectedDays.length > 0 && hour !== null;
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{ paddingBottom: 6, paddingTop: 2, margin: 2 }}
    >
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        New Job
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center " }}>
        <FormControl fullWidth margin="normal" sx={{ width: "20%" }}>
          <Select
            sx={{ backgroundColor: "white" }}
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
            sx={{ backgroundColor: "white" }}
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
          disabled={!isFormValid()}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default JobForm;
