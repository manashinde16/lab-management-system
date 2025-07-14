import React, { useState } from "react";
import { API } from "../api";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

export default function UserLogin({ setUserLoggedIn }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", form);
      localStorage.setItem("token", res.data.token);
      setUserLoggedIn();
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Login
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          name="email"
          label="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          User Login
        </Button>
      </Box>
    </Paper>
  );
}
