"use client";
import EmailInput from "@/components/signin-signup/EmailInput";
import PasswordInput from "@/components/signin-signup/PasswordInput";
import SignButton from "@/components/signin-signup/SignButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TextButton from "@/components/signin-signup/TextButton";
// import { useRouter } from "next/navigation";

function Page() {
  // const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFormActive, setIsFormActive] = useState<boolean>(true);

  const handleToggleForm = (active: boolean) => {
    setIsFormActive(active);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Email: " + email + " Password: " + password);
    //Signin başarılı ise yönlendirme
    // router.push("/");
  };

  const isFormValid = email !== "" && password !== "";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: "100%",
          minHeight: "350px",
          width: "50%",
          minWidth: "350px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#f9f7f2",
          gap: 1,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            color: "#1976d2",
            textAlign: "center",
            fontWeight: "900",
          }}
        >
          AI Content Creator
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "35%",
            justifyContent: "space-evenly",
          }}
        >
          <TextButton
            title={"Log In"}
            isFormActive={isFormActive}
            onClick={() => handleToggleForm(true)}
          />
          <TextButton
            title={"Sign In"}
            isFormActive={!isFormActive}
            onClick={() => handleToggleForm(false)}
          />
        </Box>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          isLoginInput={true}
        />
        <Box
          sx={{
            display: "flex",
            width: "65%",
            justifyContent: "space-between",
          }}
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
        <SignButton
          title="Log in"
          variant={"contained"}
          isFormValid={isFormValid}
        />
        <Divider sx={{ width: "65%", fontWeight: "bold" }}>OR</Divider>
        <SignButton title="Google" variant={"outlined"} icon={<GoogleIcon />} />
        <SignButton title="Apple" variant={"outlined"} icon={<AppleIcon />} />
        <SignButton title="Github" variant={"outlined"} icon={<GitHubIcon />} />
      </Card>
    </Box>
  );
}

export default Page;
