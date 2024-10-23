import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  isEmailValid: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
  isEmailValid,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <EmailInput
        email={email}
        setEmail={setEmail}
        isEmailValid={isEmailValid}
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        isLoginInput={true}
        handleClickShowPassword={handleClickShowPassword}
      />
      <Box
        sx={{ display: "flex", width: "65%", justifyContent: "space-between" }}
      >
        <FormControlLabel
          control={<Checkbox sx={{ color: "gray" }} />}
          label="Remember Me"
          sx={{ color: "gray" }}
        />
        <Typography
          sx={{
            alignContent: "center",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
