import React from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail }) => {
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
      <OutlinedInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="outlined-adornment-email"
        type="email"
        label="Email"
        sx={{ backgroundColor: "white" }}
      />
    </FormControl>
  );
};

export default EmailInput;
