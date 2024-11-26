import React from "react";
import { FormControl, OutlinedInput, Typography } from "@mui/material";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  isEmailValid: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  isEmailValid,
}) => {
  return (
    <FormControl sx={{ width: "65%" }} variant="outlined">
      <Typography mb={1} sx={{ fontWeight: "600" }}>
        Email Adresi
      </Typography>
      <OutlinedInput
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="outlined-adornment-email"
        type="text"
        sx={{ backgroundColor: "white", height: "40px" }}
      />
      {!isEmailValid && (
        <Typography mb={1} sx={{ fontWeight: "400", color: "red" }}>
          Lütfen gerçek bir e-posta giriniz.
        </Typography>
      )}
    </FormControl>
  );
};

export default EmailInput;
