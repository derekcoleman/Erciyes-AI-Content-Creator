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
  error?: { isError: boolean; message: string };
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
  error = { isError: false, message: "" },
}) => {
  return (
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      error={error.isError}
    >
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
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        required
        inputProps={
          error.isError
            ? {
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{9999,}$",
                title: `${error.message}`,
              }
            : {
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                title:
                  "Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir sayı içermelidir.",
              }
        }
        sx={{ backgroundColor: "white" }}
      />
    </FormControl>
  );
};

export default PasswordInput;
