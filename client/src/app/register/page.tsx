"use client";
import React, { useState } from "react";
import EmailInput from "@/components/signin-signup/EmailInput";
import PasswordInput from "@/components/signin-signup/PasswordInput";
import { Box, Button, Card, Typography } from "@mui/material";

enum Field {
  Password,
  RePassword,
}

const passwordMatcher = (password: string, rePassword: string) => {
  if (password !== rePassword) {
    return { matches: false, message: "Passwords do not match." };
  }
  return { matches: true, message: "" };
};

function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const handleClickShowPassword = (field: Field) => {
    if (field === Field.Password) {
      setShowPassword((show) => !show);
    } else if (field === Field.RePassword) {
      setShowRePassword((show) => !show);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { matches, message } = passwordMatcher(password, rePassword);
    if (!matches) {
      setError(message);
      setIsPasswordError(true);
    } else {
      setError("");
      setIsPasswordError(false);
      alert("Email: " + email + " Password: " + password);
    }
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
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={() =>
            handleClickShowPassword(Field.Password)
          }
        />
        <PasswordInput
          password={rePassword}
          setPassword={setRePassword}
          showPassword={showRePassword}
          handleClickShowPassword={() =>
            handleClickShowPassword(Field.RePassword)
          }
          error={isPasswordError}
        />
        <Button variant="contained" type="submit" disabled={!isFormValid}>
          Sign up
        </Button>
      </Card>
    </Box>
  );
}

export default Page;
