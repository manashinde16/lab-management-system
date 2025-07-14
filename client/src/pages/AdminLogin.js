import React, { useState } from "react";
import { API } from "../api";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

export default function AdminLogin({ setAdminLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setAdminLoggedIn();
    } catch (err) {
      alert("Admin login failed");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Admin Login
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="error" onClick={handleLogin}>
          Admin Login
        </Button>
      </Box>
    </Paper>
  );
}
