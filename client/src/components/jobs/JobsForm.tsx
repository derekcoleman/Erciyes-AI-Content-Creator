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
  TextField,
  Typography,
} from "@mui/material";
import { daysOfWeek, platforms } from "@/lib/conts";

const JobForm = () => {
  const [platform, setPlatform] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [hour, setHour] = useState("");

  const handleDayChange = (event) => {
    const { value } = event.target;
    setSelectedDays(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ platform, selectedDays, hour });
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

        <TextField
          sx={{ backgroundColor: "white", width: "10%" }}
          fullWidth
          margin="normal"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          placeholder="Saatinizi girin"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "10%", height: "56px", marginTop: "14px" }}
        >
          Kaydet
        </Button>
      </Box>
    </Card>
  );
};

export default JobForm;
