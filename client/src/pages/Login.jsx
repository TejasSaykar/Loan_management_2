import { Box, Button, TextField, Typography } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email: inputs.email, password: inputs.password }
      );
      if (data) {
        // console.log("Login : ", data.user);
        message.success("Login Successfully");
        setAuth({ user: data.others });
        localStorage.setItem("auth", JSON.stringify(data.others));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
    >
      <Box sx={{ boxShadow: "2px 2px 10px gray", p: 4, borderRadius: "6px" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <Box
          sx={{
            mt: 4,
            width: "40vw",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            required
            id="standard-basic"
            type="text"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            label="Email"
            variant="outlined"
            sx={{ width: 100 + "%" }}
          />
          <TextField
            required
            id="standard-basic"
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            label="Password"
            variant="outlined"
            sx={{ width: 100 + "%" }}
          />
          <Button
            sx={{ bgcolor: "#a49bff", color: "white" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
