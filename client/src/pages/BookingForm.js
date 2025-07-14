import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { API } from "../api";

export default function BookingForm() {
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    test_type: "",
    booking_date: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, booking_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        booking_date: form.booking_date.toISOString().split("T")[0], // format date as YYYY-MM-DD
      };
      await API.post("/bookings", payload);
      alert("Test booked successfully!");
      setForm({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        test_type: "",
        booking_date: null,
      });
    } catch (error) {
      alert("Booking failed. Try again.");
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <MedicalServicesIcon color="primary" />
        <Typography variant="h6">Patient Test Booking</Typography>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                type="number"
                label="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                select
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="Test Type"
                name="test_type"
                value={form.test_type}
                onChange={handleChange}
              >
                <MenuItem value="Blood Test">Blood Test</MenuItem>
                <MenuItem value="Urine Test">Urine Test</MenuItem>
                <MenuItem value="X-Ray">X-Ray</MenuItem>
                <MenuItem value="CT Scan">CT Scan</MenuItem>
                <MenuItem value="MRI">MRI</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Booking Date"
                value={form.booking_date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField fullWidth required {...params} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                Book Test
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </Paper>
  );
}
