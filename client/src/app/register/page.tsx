"use client";
import React, { useState } from "react";
import EmailInput from "@/components/signin-signup/EmailInput";
import PasswordInput from "@/components/signin-signup/PasswordInput";
import { Box, Button, Card, Typography } from "@mui/material";
import { Field } from "@/lib/types";
import { emailMatcher, passwordMatcher } from "@/lib/validators";

function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<{
    message: string;
    isError: boolean;
  }>({ message: "", isError: false });

  const handleClickShowPassword = (field: Field) => {
    if (field === Field.Password) {
      setShowPassword((show) => !show);
    } else if (field === Field.RePassword) {
      setShowRePassword((show) => !show);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordError({ isError: false, message: "" });
    setIsEmailValid(true);

    const validationRes = emailMatcher(email);
    const { error, message } = passwordMatcher(password, rePassword);

    if (!validationRes) {
      setIsEmailValid(false);
      return;
    }
    if (error) {
      setPasswordError({ isError: error, message });
      return;
    }

    alert("Email: " + email + " Password: " + password);
  };

  const isFormValid = email !== "" && password !== "" && rePassword !== "";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: "40%",
          minHeight: "350px",
          width: "20%",
          minWidth: "350px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#f9f7f2",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            color: "#1976d2",
            textAlign: "center",
          }}
        >
          Sign up
        </Typography>
        <EmailInput
          email={email}
          setEmail={setEmail}
          isEmailValid={isEmailValid}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={() =>
            handleClickShowPassword(Field.Password)
          }
          error={passwordError}
        />
        <PasswordInput
          password={rePassword}
          setPassword={setRePassword}
          showPassword={showRePassword}
          handleClickShowPassword={() =>
            handleClickShowPassword(Field.RePassword)
          }
          error={passwordError}
        />
        <Button variant="contained" type="submit" disabled={!isFormValid}>
          Sign up
        </Button>
      </Card>
    </Box>
  );
}

export default Page;
