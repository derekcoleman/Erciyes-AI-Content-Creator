import React from "react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, TextField } from "@mui/material";

export default function CustomTimePicker({ value, onChange }) {
  return (
    <Box sx={{ marginTop: "16px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Zaman Seçin"
          value={value}
          onChange={onChange}
          views={["hours"]}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
