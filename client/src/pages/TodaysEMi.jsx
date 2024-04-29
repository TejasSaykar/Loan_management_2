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
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CiCircleCheck } from "react-icons/ci";
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
  const [updatedRow, setUpdatedRow] = useState([]);

  console.log("updateRow : ", updatedRow);

  console.log("Single User : ", singleUser?.user?.emiAmount);

  // let date = singleUser?.user?.applicationDate;
  const [newDate, setNewDate] = useState("");

  const handleUpdateRow = (newarray) => {
    setUpdatedRow(newarray);
    localStorage.setItem("currentRowId", JSON.stringify(newarray));
  };

  useEffect(() => {
    const storedArray = localStorage.getItem("currentRowId");
    if (storedArray) {
      setUpdatedRow(JSON.parse(storedArray));
    }
  }, []);

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

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/update-user/${id}`,
        { totalEmiAmountRecieved: singleUser?.user?.emiAmount }
      );
      if (data) {
        message.success("Customer Updated Successfully");
        handleClose();
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                    <TableRow
                      key={user._id}
                      style={{
                        backgroundColor: updatedRow.includes(user._id)
                          ? "lightgreen"
                          : "white",
                      }}
                    >
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
                                handleUpdateRow([...updatedRow, user._id]);
                              }}
                            >
                              Paid
                              <h2>
                                {user?.todayEmi === true && <CiCircleCheck />}
                              </h2>
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
