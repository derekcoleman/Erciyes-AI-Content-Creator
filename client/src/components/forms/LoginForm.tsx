import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import PasswordInput from "../inputs/PasswordInput";
import TextInput from "../inputs/TextInput";

interface LoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  isEmailValid: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  handleClickShowPassword,
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
      <TextInput text={username} setText={setUsername} title="Kullanıcı Adı" />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
      />
      <Box
        sx={{ display: "flex", width: "65%", justifyContent: "space-between" }}
      >
        <FormControlLabel
          control={<Checkbox sx={{ color: "gray" }} />}
          label="Beni Hatırla"
          sx={{ color: "gray" }}
        />
        <Typography
          sx={{
            alignContent: "center",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Şifremi Unuttum?
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
