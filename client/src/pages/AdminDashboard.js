import React, { useEffect, useState } from "react";
import { API } from "../api";

import {
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAll = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      fetchAll();
    } else {
      try {
        const res = await API.get(`/bookings/search?name=${value}`);
        setBookings(res.data);
      } catch (err) {
        alert("Search failed");
      }
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Paper sx={{ p: 3, width: "100%", maxWidth: "1200px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <MedicalInformationIcon color="primary" /> All Patient Bookings
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>

      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="bookings table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Patient Name</TableCell>
              <TableCell sx={{ color: "white" }}>Age</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Test Type</TableCell>
              <TableCell sx={{ color: "white" }}>Booking Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.test_type}</TableCell>
                  <TableCell>{row.booking_date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
