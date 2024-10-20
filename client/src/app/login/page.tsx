"use client";
import EmailInput from "@/components/signin-signup/EmailInput";
import PasswordInput from "@/components/signin-signup/PasswordInput";
import SignButton from "@/components/signin-signup/SignButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import { useRouter } from "next/navigation";

function Page() {
  // const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        justifyContent: "flex-start",
        alignItems: "center",
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
          background:
            "linear-gradient(134.49deg, rgba(9, 58, 237, 0.08) -0.83%, rgba(1, 215, 235, 0.08) 54.23%) ",
          backdropFilter: "blur(80px)",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            gap: 2,
            marginBottom: "10%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              marginBottom: "5%",
            }}
          >
            <LogoDevIcon sx={{ color: "#1976d2" }} fontSize="large" />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                color: "#1976d2",
                textAlign: "center",
                fontWeight: "900",
              }}
            >
              AI Content Creator
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "35%",
              justifyContent: "space-evenly",
              marginBottom: "2%",
            }}
          >
            <Tabs value={value} onChange={handleChangeTabs} centered>
              <Tab
                sx={{
                  fontWeight: "900",
                  fontSize: "18px",
                  color: "gray",
                }}
                label="Log In"
              ></Tab>
              <Tab
                sx={{
                  fontWeight: "900",
                  fontSize: "18px",
                  color: "gray",
                }}
                label="Sign In"
              ></Tab>
            </Tabs>
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
          <SignButton
            title="Continue with Google"
            variant={"outlined"}
            icon={<GoogleIcon />}
          />
          <SignButton
            title="Continue with Apple"
            variant={"outlined"}
            icon={<AppleIcon />}
          />
          <SignButton
            title="Continue with Github"
            variant={"outlined"}
            icon={<GitHubIcon />}
          />
        </Box>
      </Card>
      <Box
        sx={{
          padding: 0,
          margin: 0,
          height: "100vh",
          width: "50vw",
          backgroundImage: "url(/Gradient.png)",
          backgroundSize: "100% 100%",
          backgroundPosition: "right",
          backgroundRepeat: " no-repeat",
        }}
      />
    </Box>
  );
}

export default Page;
