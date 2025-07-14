import React, { useState } from "react";
import { API } from "../api";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registered Successfully");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField name="name" label="Name" onChange={handleChange} required />
        <TextField
          name="email"
          label="Email"
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </Box>
    </Paper>
  );
}
