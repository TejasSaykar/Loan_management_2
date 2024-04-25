import { Box, Typography } from "@mui/material";
import React from "react";
import SideNav from "../components/SideNav";

const Report = () => {
  return (
    <Box sx={{ display: "flex", bgcolor: "#F8F5F5" }}>
      <SideNav />
      <Box sx={{ p: 3 }}>
        <Typography>Report</Typography>
      </Box>
    </Box>
  );
};

export default Report;
