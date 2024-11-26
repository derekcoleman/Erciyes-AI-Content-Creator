"use client";

import SignButton from "@/components/buttons/SignButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Box, Card, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, LoginInfo, RegisterInfo } from "@/lib/types";
import { emailMatcher, passwordMatcher } from "@/lib/validators";
import { loginUser, registerUser } from "@/lib/utils";
import { useAtom } from "jotai";
import { userInfoAtom, tokenAtom } from "@/store";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../styles/theme";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [user, setUser] = useAtom(userInfoAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<{
    message: string;
    isError: boolean;
  }>({ message: "", isError: false });
  const [value, setValue] = useState<number>(0);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickShowPassword = (field: Field) => {
    if (field === Field.Password) {
      setShowPassword((show) => !show);
    } else if (field === Field.RePassword) {
      setShowRePassword((show) => !show);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsEmailValid(true);
    const validationRes = emailMatcher(email);
    setFormError({ isError: false, message: "" });

    if (value === 0) {
      try {
        const loginInfo: LoginInfo = await loginUser({ username, password });
        if (loginInfo.status) {
          setUser(loginInfo);
          setToken("userInfo.token");
          console.log(loginInfo);
          document.cookie = `token=${loginInfo.token}`;
          alert("Login successful!");
          router.push("/");
        } else {
          alert("Login failed: " + loginInfo.message);
        }
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    }

    if (!validationRes) {
      setIsEmailValid(false);
      return;
    } else if (value === 1) {
      const { error, message } = passwordMatcher(password, confirmPassword);
      if (error) {
        setFormError({ isError: true, message });
      } else {
        try {
          const registerInfo: RegisterInfo = await registerUser({
            username,
            email,
            password,
          });
          if (registerInfo.code) {
            alert("register successful!");
          } else {
            alert("register failed: " + registerInfo.message);
          }
        } catch (error) {
          alert("register failed: " + error.message);
        }
      }
    }
  };

  const isFormValid =
    value === 0
      ? username !== "" && password !== ""
      : email !== "" &&
        username !== "" &&
        password !== "" &&
        confirmPassword !== "";

  return (
    <ThemeProvider theme={lightTheme}>
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
                marginBlock: "5%",
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
                  label="Giriş Yap"
                ></Tab>
                <Tab
                  sx={{
                    fontWeight: "900",
                    fontSize: "18px",
                    color: "gray",
                  }}
                  label="Kayıt Ol"
                ></Tab>
              </Tabs>
            </Box>
            {value === 0 ? (
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                handleClickShowPassword={() =>
                  handleClickShowPassword(Field.Password)
                }
                isEmailValid={isEmailValid}
              />
            ) : (
              <RegisterForm
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                showPassword={showPassword}
                showRePassword={showRePassword}
                handleClickShowPassword={handleClickShowPassword}
                isEmailValid={isEmailValid}
                formError={formError}
              />
            )}

            <SignButton
              title={value === 0 ? "Giriş Yap" : "Kayıt Ol"}
              variant={"contained"}
              isFormValid={isFormValid}
              type="submit"
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
            height: "100vh",
            width: "50vw",
            backgroundImage: "url(/Gradient.png)",
            backgroundSize: "100% 100%",
            backgroundPosition: "right",
            backgroundRepeat: " no-repeat",
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Page;
