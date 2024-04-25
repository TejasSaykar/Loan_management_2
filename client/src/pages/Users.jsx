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

const Users = () => {
  const [users, setUsers] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    mobile: null,
  });
  const [searchedData, setSearchedData] = useState(undefined);
  console.log("Search : ", searchedData);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/all-users`
      );
      if (data) {
        setUsers(data.users);
        // console.log(data.users);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { user },
      } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/search-user`,
        {
          mobile: Number(inputs.mobile),
          email: inputs.email,
        }
      );
      if (user) {
        // console.log("Searched User : ", user);
        // setSearchedData(user);
        setInputs({
          email: "",
          mobile: null,
        });
        setUsers(user);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleInputChange = (event, index) => {
  //   const { value, name } = event.target;
  //   const updatedUsers = [...users]; // Assuming users is your state variable containing the array of user objects
  //   updatedUsers[index] = {
  //     ...updatedUsers[index],
  //     [name]: parseInt(value),
  //   };
  //   setUsers(updatedUsers);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Users data : ", users);
  //   message.success("Emi updated");
  //   axios
  //     .put(`${import.meta.env.VITE_BASE_URL}/api/emi/calculate-emi`, users)
  //     .then((response) => {
  //       console.log("Data updated successfully:", response.data);
  //       fetchUser();
  //     })
  //     .catch((error) => {
  //       console.error("Error updating data:", error);
  //     });
  // };

  // const handleDateChange = (event) => {
  //   setSelectedDate(event.target.value);
  // };

  // const filteredUsers = selectedDate
  //   ? users.filter(
  //       (user) =>
  //         new Date(user.createdAt).toDateString() ===
  //         new Date(selectedDate).toDateString()
  //     )
  //   : users;

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
    <>
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
                Customer Instalments
              </Typography>
            </Grid>
            <form>
              <Box display={"flex"} justifyContent={"space-between"} px={2}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    flexGrow: 1,
                    marginBottom: "10px",
                    placeItems: "center",
                  }}
                >
                  <Grid item sm={12} md={6} lg={4}>
                    <InputLabel htmlFor="datePicker">Email : </InputLabel>
                    <TextField
                      type="email"
                      id="email"
                      value={inputs.email}
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                      capture="environment"
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <InputLabel htmlFor="datePicker">Mobile : </InputLabel>
                    <TextField
                      type="number"
                      value={inputs.mobile}
                      id="mobile"
                      onChange={(e) =>
                        setInputs({ ...inputs, mobile: e.target.value })
                      }
                      capture="environment"
                    />
                  </Grid>
                  <Grid item sm={12} lg={4}>
                    <Button
                      disabled={!inputs.email || !inputs.mobile}
                      variant="contained"
                      type="submit"
                      onClick={handleSearch}
                      sx={{ m: 2 }}
                    >
                      Search
                    </Button>
                    {records.length <= 1 && (
                      <button
                        type="submit"
                        onClick={() => fetchUser()}
                        // sx={{ my: 2, bgcolor: "green", color: "white" }}
                        className="py-2 px-4 rounded-md bg-green-700 text-white"
                      >
                        All Users
                      </button>
                    )}
                  </Grid>
                </Grid>
                {/* {selectedDate && (
                  <Box>
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{
                        py: 1,
                        "&:hover": {
                          bgcolor: "green",
                          color: "white",
                        },
                      }}
                      size="small"
                      onClick={() => setSelectedDate("")}
                    >
                      All Users <ExpandMoreIcon />{" "}
                    </Button>
                  </Box>
                )} */}
              </Box>
              <Table
                sx={{ width: 100 + "%", overflowX: "scroll" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Laon Amount Requested
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Loan Product
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Affordable EMI
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Address of Property
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Father Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      Paid / Unpaid
                    </TableCell>
                    {/* <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Type
                    </TableCell> */}
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
                    {records.length === 0 && <h2>Customer Not Found</h2>}
                  </div>

                  {records &&
                    records.map((user, index) => (
                      <TableRow key={user._id}>
                        {/* <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell> */}
                        <TableCell align="left">
                          {user.nameOfApplicant}
                        </TableCell>
                        <TableCell align="left">
                          {user.loanAmountNumber}
                        </TableCell>
                        <TableCell align="left">{user.loanProduct}</TableCell>
                        <TableCell
                          align="left"
                          // sx={{ display: "flex", alignItems: "center" }}
                        >
                          {user.affordableEmi}
                          {/* <TextField
                          type="number"
                          name="enteredEmiAmount"
                          ref={inputRef}
                          // value={user.emiAmount}
                          sx={{ width: "50%" }}
                          onChange={(e) => {
                            console.log("Value changing to : ", e.target.value),
                              handleInputChange(e, index);
                          }}
                        /> */}
                        </TableCell>
                        <TableCell align="left">
                          {user.addressOfProperty}
                        </TableCell>
                        <TableCell align="left">
                          {user.fatherNameOfApplicant}
                        </TableCell>
                        {/* <TableCell>
                        <Link
                          to={`/edit-user/${user._id}`}
                          style={{
                            textDecoration: "underline",
                            marginLeft: "5px",
                          }}
                        >
                          View user
                        </Link>
                      </TableCell> */}
                        <TableCell align="left">
                          <Typography>
                            <span className="flex gap-2 items-center">
                              <Link onClick={handleOpen} className="bg-green-700 rounded-sm px-2 py-1 text-white">
                                Paid
                              </Link>
                              <Link className="bg-rose-600 rounded-sm px-2 py-1 text-white">
                                Unpaid
                              </Link>
                            </span>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}

                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      m: 3,
                    }}
                  >
                    <Box>
                      <Button
                        disabled={firstIndex === 0}
                        variant={"contained"}
                        onClick={prePage}
                      >
                        Prev
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      {numbers.map((item) => (
                        <Typography
                          sx={
                            currentPage === item && {
                              backgroundColor: "skyblue",
                              color: "white",
                              px: 2,
                              py: 1,
                            }
                          }
                        >
                          {item}
                        </Typography>
                      ))}
                    </Box>
                    <Box>
                      <Button
                        // disabled={lastIndex === npage }
                        variant={"contained"}
                        onClick={nextPage}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>

                  {/* {searchedData !== undefined && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {1}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.nameOfApplicant}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.loanAmountNumber}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.loanProduct}
                      </TableCell>
                      <TableCell
                        align="left"
                      >
                        {searchedData.affordableEmi}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.addressOfProperty}
                      </TableCell>
                      <TableCell align="left">
                        {searchedData.fatherNameOfApplicant}
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            color: "darkblue",
                            textDecoration: "underline",
                          }}
                        >
                          <Link to={`/edit-user/${searchedData._id}`}>
                            Edit
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
              {/* {filteredUsers.length !== 0 && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="submit" variant="contained" sx={{ m: 2 }}>
                    Submit
                  </Button>
                </Box>
              )} */}
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
                // value={newDate}
                // onChange={(e) => setNewDate(e.target.value)}
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
                // onClick={() => handleUpdate(singleUser?.user?._id)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Users;
