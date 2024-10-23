import {
  FormControl,
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
  title?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
  error = { isError: false, message: "" },
  isLoginInput = false,
  title = "Password",
}) => {
  return (
    <FormControl sx={{ width: "65%" }} variant="outlined" error={error.isError}>
      <Typography mb={1} sx={{ fontWeight: "600" }}>
        {title}
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
        sx={{ backgroundColor: "white", height: "40px" }}
      />
      {error.isError && (
        <Typography mb={1} sx={{ fontWeight: "400", color: "red" }}>
          {error.message}
        </Typography>
      )}
    </FormControl>
  );
};

export default PasswordInput;
