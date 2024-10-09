"use client";
import { Box, Button, Card, TextField } from "@mui/material";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: "55vh",
          width: "30%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Login</h2>
        <TextField
          required
          label="Email"
          inputProps={{
            type: "email",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </Card>
    </Box>
  );
}

export default Page;
