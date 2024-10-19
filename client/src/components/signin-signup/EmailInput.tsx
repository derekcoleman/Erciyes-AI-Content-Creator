import React from "react";
import { FormControl, OutlinedInput, Typography } from "@mui/material";
import { Label } from "@mui/icons-material";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail }) => {
  return (
    <FormControl sx={{ width: "65%" }} variant="outlined">
      <Typography mb={2} sx={{ fontWeight: "600" }}>
        Email Address
      </Typography>
      <OutlinedInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="outlined-adornment-email"
        type="email"
        sx={{ backgroundColor: "white", height: "50px" }}
      />
    </FormControl>
  );
};

export default EmailInput;
