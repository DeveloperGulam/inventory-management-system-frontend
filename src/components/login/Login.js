import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const logo = "https://www.crossval.com/_nuxt/CrossvalFinalgreen.6d7dc8fc.png";

  useEffect(() => {
    const validateUser = () => {
      if (localStorage["token"]) {
        navigate("/dashboard", { replace: true });
      }
    }

    validateUser();
  }, [navigate]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const userData = { username, password };
      const response = await login(userData);

      const { token } = response;

      // Saving token to local storage
      localStorage.setItem("token", token);

      // Navigate to the dashboard page
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(89.09deg,#0e7469 3.31%,#2bae95 95.19%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 0",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: "3rem",
          width: "24rem",
          maxWidth: "95%",
          zIndex: "1",
          borderRadius: "1rem",
        }}
      >
        <Stack spacing={2}>
          <img
            src={logo}
            alt="logo"
            width="150"
            style={{ alignSelf: "center", padding: 0 }}
          />
          <Typography align="center" component="h1" variant="h5" sx={{ mb: 1 }}>
            Sign in
          </Typography>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            required
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />

          {error && (
          <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
            {error}
          </Typography>
          )}

          <Button 
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            sx={{
              padding: "10px",
              backgroundColor: "#2bae95",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "0.5rem",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#0e7469",
              },
            }}
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </Button>
        </Stack>
      </Paper>
      <Typography
        variant="body2"
        sx={{
          color: "white",
          position: "absolute",
          bottom: "1rem"
        }}
      >
        Inventory Management System by | CrossVal Team.
      </Typography>
    </Box>
  );
};

export default Login;
