import React, { useState } from "react";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import BookingForm from "./pages/BookingForm";
import AdminDashboard from "./pages/AdminDashboard";

import {
  Container,
  Button,
  Typography,
  Box,
  Stack,
  AppBar,
  Toolbar,
} from "@mui/material";

function App() {
  const [page, setPage] = useState("user-login");
  const [userLoggedIn, setUserLoggedIn] = useState(
    !!localStorage.getItem("token") && localStorage.getItem("role") === "user"
  );
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    !!localStorage.getItem("token") && localStorage.getItem("role") === "admin"
  );

  const handleLogout = () => {
    localStorage.clear();
    setUserLoggedIn(false);
    setAdminLoggedIn(false);
    setPage("user-login");
  };

  const renderPage = () => {
    if (userLoggedIn) return <BookingForm />;
    if (adminLoggedIn) return <AdminDashboard />;

    switch (page) {
      case "user-login":
        return (
          <UserLogin
            setUserLoggedIn={() => {
              setUserLoggedIn(true);
              localStorage.setItem("role", "user");
            }}
          />
        );
      case "register":
        return <Register />;
      case "admin-login":
        return (
          <AdminLogin
            setAdminLoggedIn={() => {
              setAdminLoggedIn(true);
              localStorage.setItem("role", "admin");
            }}
          />
        );
      default:
        return (
          <UserLogin
            setUserLoggedIn={() => {
              setUserLoggedIn(true);
              localStorage.setItem("role", "user");
            }}
          />
        );
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Lab Management System
          </Typography>
          {(userLoggedIn || adminLoggedIn) && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {!userLoggedIn && !adminLoggedIn && (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant={page === "user-login" ? "contained" : "outlined"}
            onClick={() => setPage("user-login")}
          >
            User Login
          </Button>
          <Button
            variant={page === "register" ? "contained" : "outlined"}
            onClick={() => setPage("register")}
          >
            User Sign Up
          </Button>
          <Button
            variant={page === "admin-login" ? "contained" : "outlined"}
            onClick={() => setPage("admin-login")}
          >
            Admin Login
          </Button>
        </Stack>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {renderPage()}
      </Box>
    </Container>
  );
}

export default App;
