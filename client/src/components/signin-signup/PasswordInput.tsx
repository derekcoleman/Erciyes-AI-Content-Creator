import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
}) => {
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        sx={{ backgroundColor: "white" }}
      />
    </FormControl>
  );
};

export default PasswordInput;
