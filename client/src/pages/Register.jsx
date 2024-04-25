import { Box, Button, TextField, Typography } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password) {
      message.error("All fields are required!");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        { ...inputs }
      );
      if (data) {
        console.log("Register : ", data.user);
        message.success("Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Register
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
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            label="User Name"
            variant="outlined"
            sx={{ width: 100 + "%" }}
          />
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
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
