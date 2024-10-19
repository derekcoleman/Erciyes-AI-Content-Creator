import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  error?: { isError: boolean; message: string };
  isLoginInput?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
  error = { isError: false, message: "" },
  isLoginInput = false,
}) => {
  return (
    <FormControl sx={{ width: "65%" }} variant="outlined" error={error.isError}>
      <Typography mb={2} sx={{ fontWeight: "600" }}>
        Email Address
      </Typography>
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
        required
        inputProps={
          isLoginInput
            ? {}
            : error.isError
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
        sx={{ backgroundColor: "white", height: "50px" }}
      />
    </FormControl>
  );
};

export default PasswordInput;
