import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import SideNav from "../components/SideNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, message } from "antd";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TodaysEMi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleUser, setSingleUser] = useState();

  // let date = singleUser?.user?.applicationDate;
  const [newDate, setNewDate] = useState(
    moment(singleUser?.user?.applicationDate)
  );

  console.log("NEW DATE : ", singleUser?.user?.applicationDate);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUsers = async () => {
    try {
      const { data: user } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/currentdate-user`
      );
      if (user) {
        // console.log("Current Date Users : ", user)
        setUsers(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleUser = async (id) => {
    handleOpen();
    try {
      const { data: user } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/single-user/${id}`
      );
      if (user) {
        console.log("Single User : ", user);
        setSingleUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (id) => {
    // e.preventDefault();
    if (newDate === singleUser?.user?.applicationDate) {
      handleClose();
      return message.error("Already Updated");
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/update-user/${id}`,
        {
          createdAt: newDate,
        }
      );
      if (data) {
        message.success("Customer Updated Successfully");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mx: 3, mt: 20 }}>
        <Card>
          <CardContent>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Loading....</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#F8F5F5",
        height: 100 + "%",
        width: 100 + "%",
      }}
    >
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <TableContainer component={Paper}>
          <Grid display="flex" justifyContent={"center"} sx={{ my: 2 }}>
            <Typography variant="h4" color={"gray"}>
              Today's EMI's
            </Typography>
          </Grid>
          <form>
            <Table
              sx={{ width: 100 + "%", overflowX: "scroll" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Laon Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Mobile Number
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Affordable EMI
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Guarantee Person Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Paid / Unpaid
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    width: "100%",
                    margin: "auto",
                    justifyContent: "center",
                    padding: "5px 0px",
                  }}
                >
                  {users?.user?.length < 1 && <h2>No EMI's Today</h2>}
                </div>

                {users?.user &&
                  users?.user?.map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{user.nameOfApplicant}</TableCell>
                      <TableCell align="left">
                        {user.loanAmountNumber}
                      </TableCell>
                      <TableCell align="left">{user.loanProduct}</TableCell>
                      <TableCell align="left">{user.affordableEmi}</TableCell>
                      <TableCell align="left">{user.reference1Name}</TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            color: "darkblue",
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <Link>
                            <Button
                              variant="contained"
                              sx={{ width: "fit" }}
                              color="success"
                              onClick={() => {
                                fetchSingleUser(user._id);
                              }}
                            >
                              Paid
                            </Button>
                          </Link>
                          <Link to={`/edit-user/${user._id}`}>
                            <Button
                              variant="contained"
                              sx={{ width: "fit" }}
                              color="error"
                            >
                              Unpaid
                            </Button>
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </form>
        </TableContainer>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ fontStyle: "bold" }}
            component="h2"
          >
            Edit Customer
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
          >
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{
                border: "1.2px solid gray",
                borderRadius: "5px",
                px: 4,
                cursor: "pointer",
              }}
              className="px-4 focus:outline-none"
            />
            <Button
              variant="contained"
              type="submit"
              onClick={() => handleUpdate(singleUser?.user?._id)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TodaysEMi;
