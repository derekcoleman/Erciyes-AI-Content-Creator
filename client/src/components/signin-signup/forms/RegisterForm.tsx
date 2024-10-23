import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { Field } from "@/lib/types";
import EmailInput from "../inputs/EmailInput";
import TextInput from "../inputs/TextInput";
import PasswordInput from "../inputs/PasswordInput";

interface RegisterFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  showRePassword: boolean;
  handleClickShowPassword: (field: Field) => void;
  isEmailValid: boolean;
  formError: { message: string; isError: boolean };
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  showRePassword,
  handleClickShowPassword,
  isEmailValid,
  formError,
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
      <TextInput text={name} setText={setName} title="Name" />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        handleClickShowPassword={() => handleClickShowPassword(Field.Password)}
      />
      <PasswordInput
        password={confirmPassword}
        setPassword={setConfirmPassword}
        showPassword={showRePassword}
        title="Confirm Password"
        handleClickShowPassword={() =>
          handleClickShowPassword(Field.RePassword)
        }
        error={formError}
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "gray" }} />}
        label="Please keep me updated by email with latest news, event 
                updates and more information from AI Content Creator."
        sx={{ color: "gray", marginTop: 2, width: "65%" }}
      />
    </Box>
  );
};

export default RegisterForm;
